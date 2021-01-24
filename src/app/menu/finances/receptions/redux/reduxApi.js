import {
  receptionsGet,
  receptionCreate,
  receptionUpdate,
  receptionDelete,
  receptionRestore,
  receptionHardDel,
  // receptionsImport,
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

// url: /keuangan/penerimaan
export const receptionsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'receptionsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      const search = st;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', search);
      const fetchData = await fetch(SITE_ADDRESS + 'api/receptions', {
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
      dispatch(detailsItem({ id: 'penerimaan', total: response.total }));
      dispatch(receptionsGet(response.receptions));
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
// url: "/keuangan/penerimaan/tambah"
export const receptionAdd = (reception, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'receptionAdd' });
    const formData = new FormData();
    const random = customAlphabet(NUM_ALPHABET, 5);
    const receptionCode = `${yearMonth()}${dateDay()[0]}-PN${random()}`;
    const transactionCode = `${yearMonth()}${dateDay()[0]}-TR${random()}`;
    const date = reception.date.toISOString();
    formData.append('receptionCode', receptionCode);
    formData.append('transactionCode', transactionCode);
    formData.append('date', date);
    formData.append('accountCode', reception.accountCode);
    formData.append('accountName', reception.accountName);
    formData.append('receptionType', reception.receptionType);
    formData.append('receptionName', reception.receptionName);
    formData.append('receptionSum', reception.receptionSum);
    formData.append('receptionUnit', reception.receptionUnit);
    formData.append('receptionTotal', reception.receptionTotal);
    formData.append('remarks', reception.remarks);
    formData.append('createdBy', auth.userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/receptions/create', {
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
      const reception = response.reception;
      dispatch(detailsItem({ id: 'penerimaan', total: total + 1 }));
      dispatch(receptionCreate(reception));
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
// url: "/keuangan/simpanan/edit/:savingId"
export const receptionEdit = (values, auth, receptionId) => {
  console.log(values.date);
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'receptionEdit' });
    const formData = new FormData();
    formData.append(
      'receptionPrimary',
      values.receptionPrimary !== null
        ? values.receptionPrimary.length > 0
          ? values.receptionPrimary
          : null
        : null
    );
    formData.append(
      'receptionSecondary',
      values.receptionSecondary !== null
        ? values.receptionSecondary.length > 0
          ? values.receptionSecondary
          : null
        : null
    );
    formData.append(
      'receptionTertier',
      values.receptionTertier !== null
        ? values.receptionTertier.length > 0
          ? values.receptionTertier
          : null
        : null
    );
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
        SITE_ADDRESS + 'api/receptions/update/' + receptionId,
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
      const reception = response.reception;
      dispatch(receptionUpdate(reception));
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
// url: "/keuangan/simpanan/[Modal:Delete]"
export const receptionDel = (receptionId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'receptionDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/receptions/delete/' + receptionId,
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
      const reception = response.reception;
      dispatch(detailsItem({ id: 'simpanan', total: total - 1 }));
      dispatch(receptionDelete(reception.id));
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
// url: "/keuangan/simpanan/[Modal:Restore]"
export const receptionRes = (receptionId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payloadd: 'receptionRestore' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/receptions/restore/' + receptionId,
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
      const reception = response.reception;
      dispatch(detailsItem({ id: 'simpanan', total: total - 1 }));
      dispatch(receptionRestore(reception.id));
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
// url: "/keuangan/simpanan/[Modal:HardDel]"
export const receptionHDel = (receptionId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'receptionHDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/receptions/hard-delete/' + receptionId,
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
      const reception = response.reception;
      dispatch(receptionHardDel(reception.id));
      dispatch(detailsItem({ id: 'simpanan', total: total - 1 }));
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
