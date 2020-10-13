import {
  accountsGet,
  // accountCreate,
  accountUpdate,
  // accountDelete,
  accountsImport,
} from './reduxAction';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { randomNumber } from '../../../../common/helpers/othersHelpers';
import { progressPercent } from '../../../pages/progress/redux/progressAction';
import { openModal } from '../../../modals/redux/modalActions';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';

// url: /keuangan/akun
export const accountsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/accounts', {
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
      dispatch(detailsItem({ id: 'akun', total: response.totals }));
      dispatch(accountsGet(response.accounts));
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
// url: "/keuangan/akun/edit/:accountId"
export const accountEdit = (values, auth, accountId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountEdit' });
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
        SITE_ADDRESS + 'api/accounts/edit/' + accountId,
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
      const member = response.member;
      dispatch(accountUpdate(member));
      toastr.success('Sukses', `Update Anggota.`);
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
// url: '/keuangan/akun/import'
export const accountsImp = (data, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountsImport' });
    try {
      let progress = randomNumber(1, 15);
      dispatch(progressPercent(progress));
      const accountsData = JSON.stringify(data);
      const formData = new FormData();
      formData.append('accounts', accountsData);
      progress = randomNumber(20, 40);
      dispatch(progressPercent(progress));
      const fetchData = await fetch('http://localhost:3000/api/accounts/import', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      progress = randomNumber(50, 70);
      dispatch(progressPercent(progress));
      const response = await fetchData.json();
      if (response.message === 'jwt expired') {
        dispatch(openModal('SessionEndModal'));
        const error = new Error('jwt expired');
        throw error;
      }
      if (fetchData.status !== 201) {
        const error = new Error(response.message);
        throw error;
      }
      progress = randomNumber(71, 99);
      dispatch(progressPercent(progress));
      const dataSuccess = response.accountsSuccess;
      const dataError = response.accountsError;
      dispatch(accountsImport([dataSuccess, dataError]));
      let addNotif = '';
      if (dataError.length > 0) {
        addNotif = ', tapi ditemukan duplikasi';
      }
      toastr.success('Sukses', 'Impor akun selesai' + addNotif);
      progress = 100;
      dispatch(progressPercent(progress));
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
// url: "/keuangan/akun/import"
export const resetImp = () => {
  return async (dispatch) => {
    try {
      dispatch(accountsImport([]));
      dispatch(progressPercent(0));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  };
};
// // url: "/keanggotaan/anggota/tambah"
// export const memberAdd = (member, auth, history) => {
//   return async (dispatch) => {
//     dispatch({ type: ASYNC_ACTION_START, payload: 'memberAdd' });
//     const formData = new FormData();
//     const arr = Object.entries(member);
//     for (const [key, value] of arr) {
//       if (key !== 'joinDate' && key !== 'dob') {
//         if (value !== null && value) {
//           formData.append(key, value);
//         }
//       }
//     }
//     if (member.joinDate) {
//       const joinDate = member.joinDate.toISOString();
//       formData.append('joinDate', joinDate);
//     }
//     if (member.dob) {
//       const dob = member.dob.toISOString();
//       formData.append('dob', dob);
//     }
//     try {
//       let fetchData = await fetch(SITE_ADDRESS + 'api/members/create', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Authorization: 'Bearer ' + auth.token,
//         },
//       });
//       const response = await fetchData.json();
//       if (response.message === 'jwt expired') {
//         dispatch(openModal('SessionEndModal'));
//         const error = new Error('jwt expired');
//         throw error;
//       }
//       if (fetchData.status !== 201) {
//         const error = new Error(response.message);
//         throw error;
//       }
//       const member = response.member;
//       dispatch(accountCreate(member));
//       dispatch(asyncActionFinish());
//       history.push(`/keanggotaan/anggota/detail/${response.member.code}`);
//       toastr.success('Sukses', 'Anggota telah dibuat');
//     } catch (error) {
//       if (error.message === 'jwt expired') {
//         console.log(error);
//       } else {
//         console.log(error);
//         toastr.error('Error', `${error.message}`);
//       }
//       dispatch(asyncActionError());
//     }
//   };
// };
// // url: '/keanggotaan/anggota/detail/:memberId'
// export const memberView = (memberId, auth) => {
//   return async (dispatch) => {
//     dispatch({ type: ASYNC_ACTION_START, payload: 'memberView' });
//     try {
//       const fetchData = await fetch(SITE_ADDRESS + 'api/members/' + memberId, {
//         headers: {
//           Authorization: 'Bearer ' + auth.token,
//         },
//       });
//       const response = await fetchData.json();
//       if (response.message === 'jwt expired') {
//         dispatch(openModal('SessionEndModal'));
//         const error = new Error('jwt expired');
//         throw error;
//       }
//       if (fetchData.status !== 200) {
//         const error = new Error(response.message);
//         throw error;
//       }
//       const member = response.member;
//       dispatch(accountUpdate(member));
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       if (error.message === 'jwt expired') {
//         console.log(error);
//       } else {
//         console.log(error);
//         toastr.error('Error', `${error.message}`);
//       }
//       dispatch(asyncActionError());
//     }
//   };
// };
// export const memberPhotoUpload = (file, filename, auth, memberId) => {
//   return async (dispatch) => {
//     dispatch({ type: ASYNC_ACTION_START, payload: 'memberPhotoUpload' });
//     const token = auth.token;
//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('filename', filename);
//     try {
//       let fetchData = await fetch(
//         SITE_ADDRESS + 'api/members/photo-upload/' + memberId,
//         {
//           method: 'POST',
//           body: formData,
//           headers: {
//             Authorization: 'Bearer ' + token,
//           },
//         }
//       );
//       const response = await fetchData.json();
//       if (response.message === 'jwt expired') {
//         dispatch(openModal('SessionEndModal'));
//         const error = new Error('jwt expired');
//         throw error;
//       }
//       if (fetchData.status !== 200) {
//         const error = new Error(response.message);
//         throw error;
//       }
//       let member = response.member;
//       dispatch(accountUpdate(member));
//       toastr.success('Sukses', 'Profil foto tersimpan');
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       if (error.message === 'jwt expired') {
//         console.log(error);
//       } else {
//         console.log(error);
//         toastr.error('Error', `${error.message}`);
//       }
//       dispatch(asyncActionError());
//     }
//   };
// };

// export const memberMainPhotoSet = (memberId, photo, auth) => {
//   return async (dispatch) => {
//     dispatch({ type: ASYNC_ACTION_START, payload: 'memberMainPhotoSet' });
//     const formData = new FormData();
//     formData.append('mainPhoto', photo);
//     try {
//       let fetchData = await fetch(
//         SITE_ADDRESS + 'api/members/edit/' + memberId,
//         {
//           method: 'POST',
//           body: formData,
//           headers: {
//             Authorization: 'Bearer ' + auth.token,
//           },
//         }
//       );
//       const response = await fetchData.json();
//       if (response.message === 'jwt expired') {
//         dispatch(openModal('SessionEndModal'));
//         const error = new Error('jwt expired');
//         throw error;
//       }
//       if (fetchData.status !== 200) {
//         const error = new Error(response.message);
//         throw error;
//       }
//       let member = response.member;
//       dispatch(accountUpdate(member));
//       toastr.success('Sukses', 'Update foto profil');
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       if (error.message === 'jwt expired') {
//         console.log(error);
//       } else {
//         console.log(error);
//         toastr.error('Error', `${error.message}`);
//       }
//       dispatch(asyncActionError());
//     }
//   };
// };

// export const memberPhotoDelete = (id, auth) => {
//   return async (dispatch) => {
//     dispatch({ type: ASYNC_ACTION_START, payload: 'memberPhotoDelete' });
//     try {
//       const formData = new FormData();
//       const userId = auth.userId;
//       formData.append('userId', userId);
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       if (error.message === 'jwt expired') {
//         console.log(error);
//       } else {
//         console.log(error);
//         toastr.error('Error', `${error.message}`);
//       }
//       dispatch(asyncActionError());
//     }
//   };
// };

// export const memberDel = (memberId, code, auth) => {
//   return async (dispatch) => {
//     dispatch({ type: ASYNC_ACTION_START, payload: 'accountDelete' });
//     const formData = new FormData();
//     const userId = auth.userId;
//     formData.append('userId', userId);
//     try {
//       let fetchData = await fetch(
//         SITE_ADDRESS + 'api/members/delete/' + memberId,
//         {
//           method: 'POST',
//           body: formData,
//           headers: {
//             Authorization: 'Bearer ' + auth.token,
//           },
//         }
//       );
//       const response = await fetchData.json();
//       if (response.message === 'jwt expired') {
//         dispatch(openModal('SessionEndModal'));
//         const error = new Error('jwt expired');
//         throw error;
//       }
//       if (fetchData.status !== 200) {
//         const error = new Error(response.message);
//         throw error;
//       }
//       const member = response.member;
//       dispatch(accountDelete(member.userId));
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       if (error.message === 'jwt expired') {
//         console.log(error);
//       } else {
//         console.log(error);
//         toastr.error('Error', `${error.message}`);
//       }
//       dispatch(asyncActionError());
//     }
//   };
// };
