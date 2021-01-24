import {
  accountsGet,
  accountCreate,
  accountUpdate,
  accountDelete,
  accountRestore,
  accountHardDel,
  accountsImport,
} from './reduxAction';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { openModal, closeModal } from '../../../modals/redux/modalActions';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';

// url: /keuangan/akun
export const accountsIndex = (token, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountsIndex' });
    try {
      const formData = new FormData();
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
      dispatch(detailsItem({ id: 'akun', total: response.total }));
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
// url: "/keuangan/akun/add"
export const accountAdd = (values, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountAdd' });
    const formData = new FormData();
    const arr = Object.entries(values);
    for (const [key, value] of arr) {
      if (value !== null && value) {
        formData.append(key, value);
      }
    }
    try {
      const fetchData = await fetch(SITE_ADDRESS + 'api/accounts/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
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
      const account = response.account;
      dispatch(accountCreate(account));
      dispatch(closeModal());
      toastr.success('Sukses', `Membuat Akun.`);
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
      if (value !== null && value) {
        formData.append(key, value);
      }
    }
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/accounts/update/' + accountId,
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
      const account = response.account;
      dispatch(accountUpdate(account));
      dispatch(closeModal());
      toastr.success('Sukses', `Update Akun.`);
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
export const accountDel = (id, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountDelete' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/accounts/delete/' + id, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
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
      const account = response.account;
      dispatch(accountDelete(account.id));
      toastr.success('Sukses', `${account.code} telah dihapus.`);
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
export const accountRes = (id, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountRes' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/accounts/restore/' + id, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
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
      const account = response.account;
      dispatch(accountRestore(account.id));
      toastr.success('Sukses', `${account.code} telah direstore.`);
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
export const accountHDel = (id, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'accountHDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/accounts/hard-delete/' + id, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
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
      const account = response.account;
      dispatch(accountHardDel(account.id));
      toastr.success('Sukses', `${account.name} telah dihapus.`);
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
      const accountsData = JSON.stringify(data);
      const formData = new FormData();
      formData.append('accounts', accountsData);
      const fetchData = await fetch(
        'http://localhost:3000/api/accounts/import',
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
      if (fetchData.status !== 201) {
        const error = new Error(response.message);
        throw error;
      }
      const dataSuccess = response.accountsSuccess;
      const dataError = response.accountsError;
      dispatch(accountsImport([dataSuccess, dataError]));
      let addNotif = '';
      if (dataError.length > 0) {
        addNotif = ', tapi ditemukan duplikasi';
      }
      toastr.success('Sukses', 'Impor akun selesai' + addNotif);
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
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  };
};