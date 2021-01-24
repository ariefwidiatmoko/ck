import {
  recyclebinsGet,
  recyclebinDelete,
  recyclebinRestore,
} from './reduxAction';
import { detailsItem } from '../../pages/details/redux/detailsAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../async/asyncConstant';
// import { openModal } from '../../modals/redux/modalActions';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import { checkRes } from '../../../common/helpers/checkRes';

// url: /recyclebin
export const recyclebinsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'recyclebinsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      const search = st;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', search);
      const fetchData = await fetch(SITE_ADDRESS + 'api/recyclebins', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      dispatch(detailsItem({ id: 'recyclebin', total: response.total }));
      dispatch(recyclebinsGet(response.recyclebins));
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === 'jwt expired') {
        console.log(error);
      } else {
        console.log(error);
        toastr.error('Error', `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/recyclebin/[Modal:Restore]"
export const recyclebinRes = (recyclebinId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'recyclebinRes' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/recyclebins/restore/' + recyclebinId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const recyclebin = response.recyclebin;
      dispatch(recyclebinRestore(recyclebin.id));
      dispatch(detailsItem({ id: 'recyclebin', total: total - 1 }));
      toastr.success('Sukses', `Merestore data.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === 'jwt expired') {
        console.log(error);
      } else {
        console.log(error);
        toastr.error('Error', `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/recyclebin/[Modal:Delete]"
export const recyclebinDel = (recyclebinId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'recyclebinDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/recyclebins/delete/' + recyclebinId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const recyclebin = response.recyclebin;
      dispatch(recyclebinDelete(recyclebin.id));
      dispatch(detailsItem({ id: 'recyclebin', total: total - 1 }));
      toastr.success('Sukses', `Menghapus data.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === 'jwt expired') {
        console.log(error);
      } else {
        console.log(error);
        toastr.error('Error', `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
