import { staffsGet, staffUpdate } from './reduxAction';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { openModal } from '../../../modals/redux/modalActions';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';

// url: /keanggotaan/anggota
export const staffsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/members/is-staff', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      if (response.message === 'jwt expired') {
        dispatch(openModal('SessionEndModal'));
        const error = new Error('jwt expired');
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      dispatch(detailsItem({ id: 'pengurus', total: response.totals }));
      dispatch(staffsGet(response.staffs));
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
// url: '/keanggotaan/pengurus/detail/:staffId'
export const staffView = (staffId, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffView' });
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/members/is-staff/' + staffId,
        {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === 'jwt expired') {
        dispatch(openModal('SessionEndModal'));
        const error = new Error('jwt expired');
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const staff = response.staff;
      dispatch(staffUpdate(staff));
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
// url: "/keanggotaan/pengurus/edit/:staffId"
export const staffEdit = (values, auth, staffId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffEdit' });
    const formData = new FormData();
    const arr = Object.entries(values);
    for (const [key, value] of arr) {
      if (key !== 'joinDate' && key !== 'dob' && key !== 'updatedBy') {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    if (values.joinDate) {
      const joinDate =
        typeof values.joinDate !== 'string'
          ? values.joinDate.toISOString()
          : values.joinDate;
      formData.append('joinDate', joinDate);
    }
    if (values.dob) {
      const dob =
        typeof values.dob !== 'string' ? values.dob.toISOString() : values.dob;
      formData.append('dob', dob);
    }
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/members/is-staff/edit/' + staffId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === 'jwt expired') {
        dispatch(openModal('SessionEndModal'));
        const error = new Error('jwt expired');
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const staff = response.staff;
      dispatch(staffUpdate(staff));
      toastr.success('Sukses', `Update Pengurus.`);
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
