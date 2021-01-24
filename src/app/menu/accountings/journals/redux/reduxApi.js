import {
  journalsGet,
  journalCreate,
  journalUpdate,
  journalDelete,
  journalRestore,
  journalHardDel,
  // journalsImport,
} from './reduxAction';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { closeModal } from '../../../modals/redux/modalActions';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';
import { customAlphabet } from 'nanoid';
import { checkRes } from '../../../../common/helpers/checkRes';
import { NUM_ALPHABET } from '../../../../common/helpers/optionHelpers';
import { yearMonth, dateDay } from '../../../../common/helpers/othersHelpers';

// url: /akuntansi/jurnal
export const journalsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'journalsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      const search = st;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', search);
      const fetchData = await fetch(SITE_ADDRESS + 'api/journals', {
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
      dispatch(detailsItem({ id: 'jurnal', total: response.total }));
      dispatch(journalsGet(response.journals));
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
// url: "/akuntansi/jurnal/tambah"
export const journalAdd = (values, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'jurnalAdd' });
    const formData = new FormData();
    const random = customAlphabet(NUM_ALPHABET, 5);
    const code = `${yearMonth()}${dateDay()[0]}-JR${random()}`;
    const date = new Date().toISOString();
    formData.append('code', code);
    formData.append('date', date);
    formData.append('debit', values.debit);
    formData.append('credit', values.credit);
    if(values.remarks !== undefined) {
      formData.append('remarks', values.remarks);
    }
    formData.append('createdBy', auth.userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/journals/create', {
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
      const journal = response.journal
      dispatch(journalCreate(journal));
      dispatch(asyncActionFinish());
      dispatch(closeModal());
      toastr.success('Sukses', 'Data telah disimpan');
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
// url: "/akuntansi/jurnal/edit/:journalId"
export const journalEdit = (values, auth, journalId) => {
  console.log(values.date);
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'journalEdit' });
    const formData = new FormData();
    if (values.date) {
      const date =
        typeof values.date !== 'string'
          ? values.date.toISOString()
          : values.date;
      formData.append('date', date);
    }
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/journals/update/' + journalId,
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
      const journal = response.journal;
      dispatch(journalUpdate(journal));
      dispatch(closeModal());
      toastr.success('Sukses', `Update data.`);
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
// url: "/akuntansi/jurnal/[Modal:Delete]"
export const journalDel = (journalId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'journalDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/journals/delete/' + journalId,
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
      const journal = response.journal;
      dispatch(detailsItem({ id: 'jurnal', total: total - 1 }));
      dispatch(journalDelete(journal.id));
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
// url: "/akuntansi/jurnal/[Modal:Restore]"
export const journalRes = (journalId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payloadd: 'journalRestore' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/journals/restore/' + journalId,
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
      const journal = response.journal;
      dispatch(detailsItem({ id: 'jurnal', total: total - 1 }));
      dispatch(journalRestore(journal.id));
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
// url: "/akuntansi/jurnal/[Modal:HardDel]"
export const journalHDel = (journalId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'journalHDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/journals/hard-delete/' + journalId,
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
      const journal = response.journal;
      dispatch(journalHardDel(journal.id));
      dispatch(detailsItem({ id: 'jurnal', total: total - 1 }));
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
