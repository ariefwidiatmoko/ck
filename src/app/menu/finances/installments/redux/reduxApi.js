import {
  installmentsGet,
  installmentGet,
  installmentCreate,
  installmentUpdate,
  installmentDelete,
  installmentRestore,
  installmentHardDel,
  // installmentsImport,
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
import { checkRes, checkErr } from '../../../../common/helpers/checkRes';
import { NUM_ALPHABET } from '../../../../common/helpers/optionHelpers';
import { yearMonth, dateDay } from '../../../../common/helpers/othersHelpers';

// url: /keuangan/angsuran
export const installmentsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'installmentsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      const search = st;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', search);
      const fetchData = await fetch(SITE_ADDRESS + 'api/installments', {
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
      dispatch(detailsItem({ id: 'angsuran', total: response.total }));
      dispatch(installmentsGet(response.installments));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keuangan/angsuran/:id'
export const installmentView = (installmentId, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'installmentView' });
    const formData = new FormData();
    formData.append('userId', auth.userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/installments/view/' + installmentId,
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
      const installment = response.installment;
      dispatch(installmentGet(installment));
      dispatch(asyncActionFinish());
      dispatch(closeModal());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keuangan/angsuran/tambah"
export const installmentAdd = (installment, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'installmentAdd' });
    const formData = new FormData();
    const random = customAlphabet(NUM_ALPHABET, 5);
    const installmentCode = `${yearMonth()}${dateDay()[0]}-ANG${random()}`;
    const date = installment.installmentDate.toISOString();
    formData.append('loanId', installment.id);
    formData.append('installmentCode', installmentCode);
    formData.append('date', date);
    formData.append('sumTotal', installment.sumTotal);
    formData.append('installmentSum', installment.installmentSum);
    formData.append('installmentNum', installment.installmentNum);
    formData.append('loanCode', installment.loanCode);
    formData.append('loanPaid', installment.loanPaid);
    formData.append('memberId', installment.memberId);
    formData.append('remarks', installment.installmentRemarks);
    formData.append('createdBy', auth.userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/installments/create', {
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
      const installment = response.installment;
      console.log('response', installment);
      dispatch(installmentCreate(installment));
      toastr.success('Sukses', 'Data telah disimpan');
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
// url: "/keuangan/angsuran/edit/:installmentId"
export const installmentEdit = (values, auth, installmentId) => {
  console.log(values.date);
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'installmentEdit' });
    const formData = new FormData();
    // formData.append(
    //   'savingPrimary',
    //   values.savingPrimary !== null
    //     ? values.savingPrimary.length > 0
    //       ? values.savingPrimary
    //       : null
    //     : null
    // );
    // formData.append(
    //   'savingSecondary',
    //   values.savingSecondary !== null
    //     ? values.savingSecondary.length > 0
    //       ? values.savingSecondary
    //       : null
    //     : null
    // );
    // formData.append(
    //   'savingTertier',
    //   values.savingTertier !== null
    //     ? values.savingTertier.length > 0
    //       ? values.savingTertier
    //       : null
    //     : null
    // );
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
        SITE_ADDRESS + 'api/installments/update/' + installmentId,
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
      const installment = response.installment;
      dispatch(installmentUpdate(installment));
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
// url: "/keuangan/angsuran/[Modal:Delete]"
export const installmentDel = (installmentId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'installmentDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/installments/delete/' + installmentId,
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
      const installment = response.installment;
      dispatch(detailsItem({ id: 'angsuran', total: total - 1 }));
      dispatch(installmentDelete(installment.id));
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
// url: "/keuangan/angsuran/[Modal:Restore]"
export const installmentRes = (installmentId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payloadd: 'installmentRestore' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/installments/restore/' + installmentId,
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
      const installment = response.installment;
      dispatch(detailsItem({ id: 'angsuran', total: total - 1 }));
      dispatch(installmentRestore(installment.id));
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
// url: "/keuangan/angsuran/[Modal:HardDel]"
export const installmentHDel = (installmentId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'installmentHDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/installments/hard-delete/' + installmentId,
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
      const installment = response.installment;
      dispatch(installmentHardDel(installment.id));
      dispatch(detailsItem({ id: 'angsuran', total: total - 1 }));
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
