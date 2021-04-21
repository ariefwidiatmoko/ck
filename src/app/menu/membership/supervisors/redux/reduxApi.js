import { supervisorsGet, supervisorUnset, supervisorSet, supervisorUpdate } from './reduxAction';
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

// url: /keanggotaan/pengawas
export const supervisorsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/supervisors', {
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
      dispatch(detailsItem({ id: 'badan-pengawas', total: response.total }));
      dispatch(supervisorsGet(response.supervisors));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keanggotaan/pengawas/detail/:supervisorId'
export const supervisorView = (supervisorId, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorView' });
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/supervisors/' + supervisorId,
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
      const supervisor = response.supervisor;
      dispatch(supervisorSet(supervisor));
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

export const supervisorPhotoUpload = (file, filename, auth, supervisorId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorPhotoUpload' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/supervisors/photo-upload/' + supervisorId,
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
      let supervisor = response.supervisor;
      dispatch(supervisorUpdate(supervisor));
      toastr.success('Sukses', 'Profil foto tersimpan');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const supervisorMainPhotoSet = (supervisorId, photo, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorMainPhotoSet' });
    const formData = new FormData();
    formData.append('mainPhoto', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/supervisors/edit/' + supervisorId,
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
      let supervisor = response.supervisor;
      dispatch(supervisorUpdate(supervisor));
      toastr.success('Sukses', 'Update foto profil');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const supervisorPhotoDelete = (photo, auth, supervisorId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorPhotoDelete' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('photo', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/supervisors/photo-delete/' + supervisorId,
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
      let supervisor = response.supervisor;
      dispatch(supervisorUpdate(supervisor));
      toastr.success('Sukses', 'Hapus foto');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/pengawas/edit/:supervisorId"
export const supervisorEdit = (values, auth, supervisorId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorEdit' });
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
        SITE_ADDRESS + 'api/supervisors/edit/' + supervisorId,
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
      const supervisor = response.supervisor;
      dispatch(supervisorUpdate(supervisor));
      toastr.success('Sukses', `Update Anggota.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/pengawas/add"
export const supervisorAdd = (auth, supervisorId, setType, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorAdd' });
    const formData = new FormData();
    formData.append('setType', setType);
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/supervisors/set/' + supervisorId,
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
      const supervisor = response.supervisor;
      dispatch(detailsItem({ id: 'badan-pengawas', total: total + 1 }));
      dispatch(supervisorSet(supervisor));
      dispatch(memberDelete(supervisor.id));
      toastr.success('Sukses', `Update Pengawas.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/pengawas/remove"
export const supervisorRemove = (auth, supervisorId, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'supervisorRemove' });
    const formData = new FormData();
    formData.append('setType', 'Anggota');
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/supervisors/set/' + supervisorId,
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
      const supervisor = response.supervisor;
      dispatch(detailsItem({ id: 'badan-pengawas', total: total - 1 }));
      dispatch(supervisorUnset(supervisor.id));
      toastr.success('Sukses', `Update menjadi anggota.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
