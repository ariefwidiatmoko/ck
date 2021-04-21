import { managersGet, managerUnset, managerSet, managerUpdate } from './reduxAction';
import { memberDelete } from '../../members/redux/reduxAction';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';
import { checkRes, checkErr } from '../../../../common/helpers/checkRes';

// url: /keanggotaan/ketua
export const managersIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managersIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/managers', {
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
      dispatch(detailsItem({ id: 'ketua', total: response.total }));
      dispatch(managersGet(response.managers));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keanggotaan/ketua/detail/:managerId'
export const managerView = (managerId, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managerView' });
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/managers/' + managerId,
        {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      };
      const manager = response.manager;
      dispatch(managerSet(manager));
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

export const managerPhotoUpload = (file, filename, auth, managerId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managerPhotoUpload' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/managers/photo-upload/' + managerId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      let manager = response.manager;
      dispatch(managerUpdate(manager));
      toastr.success('Sukses', 'Profil foto tersimpan');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const managerMainPhotoSet = (managerId, photo, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managerMainPhotoSet' });
    const formData = new FormData();
    formData.append('mainPhoto', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/managers/edit/' + managerId,
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
      let manager = response.manager;
      dispatch(managerUpdate(manager));
      toastr.success('Sukses', 'Update foto profil');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const managerPhotoDelete = (photo, auth, managerId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managerPhotoDelete' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('photo', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/managers/photo-delete/' + managerId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      let manager = response.manager;
      dispatch(managerUpdate(manager));
      toastr.success('Sukses', 'Hapus foto');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/ketua/edit/:managerId"
export const managerEdit = (values, auth, managerId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managerEdit' });
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
        SITE_ADDRESS + 'api/managers/edit/' + managerId,
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
      const manager = response.manager;
      dispatch(managerUpdate(manager));
      toastr.success('Sukses', `Update Anggota.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/ketua/add"
export const managerAdd = (auth, managerId, setType, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managerAdd' });
    const formData = new FormData();
    formData.append('setType', setType);
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/managers/set/' + managerId,
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
      const manager = response.manager;
      dispatch(detailsItem({ id: 'ketua', total: total + 1 }));
      dispatch(managerSet(manager));
      dispatch(memberDelete(manager.id));
      toastr.success('Sukses', `Update Ketua.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/ketua/remove"
export const managerRemove = (auth, managerId, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'managerRemove' });
    const formData = new FormData();
    formData.append('setType', 'Anggota');
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/managers/set/' + managerId,
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
      const manager = response.manager;
      dispatch(detailsItem({ id: 'ketua', total: total - 1 }));
      dispatch(managerUnset(manager.id));
      toastr.success('Sukses', `Update menjadi anggota.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
