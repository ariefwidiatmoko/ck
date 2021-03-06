import { staffsGet, staffUnset, staffSet, staffUpdate } from './reduxAction';
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
export const staffsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/staffs', {
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
      dispatch(detailsItem({ id: 'pengurus', total: response.total }));
      dispatch(staffsGet(response.staffs));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
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
        SITE_ADDRESS + 'api/staffs/' + staffId,
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
      const staff = response.staff;
      dispatch(staffSet(staff));
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

export const staffPhotoUpload = (file, filename, auth, staffId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffPhotoUpload' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/staffs/photo-upload/' + staffId,
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
      let staff = response.staff;
      dispatch(staffUpdate(staff));
      toastr.success('Sukses', 'Profil foto tersimpan');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const staffMainPhotoSet = (staffId, photo, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffMainPhotoSet' });
    const formData = new FormData();
    formData.append('mainPhoto', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/staffs/edit/' + staffId,
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
      let staff = response.staff;
      dispatch(staffUpdate(staff));
      toastr.success('Sukses', 'Update foto profil');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const staffPhotoDelete = (photo, auth, staffId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffPhotoDelete' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('photo', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/staffs/photo-delete/' + staffId,
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
      let staff = response.staff;
      dispatch(staffUpdate(staff));
      toastr.success('Sukses', 'Hapus foto');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
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
        SITE_ADDRESS + 'api/staffs/edit/' + staffId,
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
      const staff = response.staff;
      dispatch(staffUpdate(staff));
      toastr.success('Sukses', `Update Anggota.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/pengurus/add"
export const staffAdd = (auth, staffId, setType, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffAdd' });
    const formData = new FormData();
    formData.append('setType', setType);
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/staffs/set/' + staffId,
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
      const staff = response.staff;
      dispatch(detailsItem({ id: 'pengurus', total: total + 1 }));
      dispatch(staffSet(staff));
      dispatch(memberDelete(staff.id));
      toastr.success('Sukses', `Update Pengurus.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/pengurus/remove"
export const staffRemove = (auth, staffId, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'staffRemove' });
    const formData = new FormData();
    formData.append('setType', 'Anggota');
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/staffs/set/' + staffId,
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
      const staff = response.staff;
      dispatch(detailsItem({ id: 'pengurus', total: total - 1 }));
      dispatch(staffUnset(staff.id));
      toastr.success('Sukses', `Update menjadi anggota.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
