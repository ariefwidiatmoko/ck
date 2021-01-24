import {
  autoJournalsGet,
  autoJournalCreate,
  autoJournalUpdate,
  autoJournalDelete,
  autoJournalRestore,
  autoJournalHardDel,
  autoJournalsImport,
} from './reduxAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { openModal, closeModal } from '../../../modals/redux/modalActions';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';
import { customAlphabet } from 'nanoid';
import { NUM_ALPHABET } from '../../../../common/helpers/optionHelpers';
import { yearMonth, dateDay } from '../../../../common/helpers/othersHelpers';
import { checkRes, checkErr } from '../../../../common/helpers/checkRes';

// url: '/pengaturan-umum/jurnal-auto'
export const autoJournalsIndex = (token, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'autoJournalsIndex' });
    try {
      const formData = new FormData();
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/auto-journals', {
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
      dispatch(autoJournalsGet(response.autoJournals));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/pengaturan-umum/jurnal-auto/tambah'
export const autoJournalAdd = (values, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'autoJournalAdd' });
    const random = customAlphabet(NUM_ALPHABET, 5);
    const code = `${yearMonth()}${dateDay()[0]}-AJ${random()}`;
    const formData = new FormData();
    const arr = Object.entries(values);
    for (const [key, value] of arr) {
      if (value !== null && value) {
        formData.append(key, value);
      }
    }
    formData.append('code', code);
    formData.append('createdBy', auth.userId);
    try {
      const fetchData = await fetch(SITE_ADDRESS + 'api/auto-journals/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 201);
      if (resultCheck) {
        throw resultCheck;
      }
      const autoJournal = response.autoJournal;
      dispatch(autoJournalCreate(autoJournal));
      dispatch(closeModal());
      toastr.success('Sukses', `Membuat Jurnal auto.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-umum/jurnal-auto/edit/:id"
export const autoJournalEdit = (values, auth, id) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'autoJournalEdit' });
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
        SITE_ADDRESS + 'api/auto-journals/update/' + id,
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
      const autoJournal = response.autoJournal;
      dispatch(autoJournalUpdate(autoJournal));
      dispatch(closeModal());
      toastr.success('Sukses', `Update Jurnal Auto`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
export const accountDel = (id, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'autoJournalDelete' });
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
      dispatch(autoJournalDelete(account.id));
      toastr.success('Sukses', `${account.code} telah dihapus.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
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
      dispatch(autoJournalRestore(account.id));
      toastr.success('Sukses', `${account.code} telah direstore.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
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
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/accounts/hard-delete/' + id,
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
      dispatch(autoJournalHardDel(account.id));
      toastr.success('Sukses', `${account.name} telah dihapus.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keuangan/akun/import'
export const accountsImp = (data, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'autoJournalsImport' });
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
      dispatch(autoJournalsImport([dataSuccess, dataError]));
      let addNotif = '';
      if (dataError.length > 0) {
        addNotif = ', tapi ditemukan duplikasi';
      }
      toastr.success('Sukses', 'Impor akun selesai' + addNotif);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keuangan/akun/import"
export const resetImp = () => {
  return async (dispatch) => {
    try {
      dispatch(autoJournalsImport([]));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  };
};
