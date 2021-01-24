import {
  loansGet,
  loanCreate,
  loanUpdate,
  loanDelete,
  loanRestore,
  loanHardDel,
  // loansImport,
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

// url: /keuangan/pinjaman
export const loansIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'loansIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      const search = st;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', search);
      const fetchData = await fetch(SITE_ADDRESS + 'api/loans', {
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
      dispatch(detailsItem({ id: 'pinjaman', total: response.total }));
      dispatch(loansGet(response.loans));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keuangan/pinjaman/tambah"
export const loanAdd = (loan, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'loanAdd' });
    const date = loan.date.toISOString();
    let fees = { adm: loan.adm, crk: loan.crk, others: loan.crk };
    let sumTotal = loan.sumTotal;
    let installment = loan.installment;
    let installmentFix = loan.installmentFix;
    const formData = new FormData();
    const random = customAlphabet(NUM_ALPHABET, 5);
    const code = `${yearMonth()}${dateDay()[0]}-PJ${random()}`;
    formData.append('code', code);
    formData.append('date', date);
    formData.append('loanSum', loan.loanSum);
    formData.append('month', loan.month);
    formData.append('interest', loan.interest);
    formData.append('fees', JSON.stringify(fees));
    formData.append('loanSaving', loan.loanSaving);
    formData.append('sumTotal', sumTotal);
    formData.append('installment', installment);
    formData.append('installmentFix', installmentFix);
    formData.append('remarks', loan.remarks);
    formData.append('memberId', loan.id);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/loans/create', {
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
      const loan = response.loan;
      dispatch(detailsItem({ id: 'pinjaman', total: total + 1 }));
      dispatch(loanCreate(loan));
      toastr.success('Sukses', 'Data telah disimpan');
      dispatch(asyncActionFinish());
      dispatch(closeModal());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keuangan/pinjaman/edit/:loanId"
export const loanEdit = (values, auth, loanId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'loanEdit' });
    const formData = new FormData();
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/loans/update/' + loanId,
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
      const loan = response.loan;
      dispatch(loanUpdate(loan));
      dispatch(closeModal());
      toastr.success('Sukses', `Update data.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keuangan/pinjaman/[Modal:Delete]"
export const loanDel = (loanId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'loanDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/loans/delete/' + loanId, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const loan = response.loan;
      dispatch(detailsItem({ id: 'pinjaman', total: total - 1 }));
      dispatch(loanDelete(loan.id));
      toastr.success('Sukses', `Menghapus data.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keuangan/pinjaman/[Modal:Restore]"
export const loanRes = (loanId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payloadd: 'loanRestore' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/loans/restore/' + loanId,
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
      const loan = response.loan;
      dispatch(detailsItem({ id: 'pinjaman', total: total - 1 }));
      dispatch(loanRestore(loan.id));
      toastr.success('Sukses', `Merestore data.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keuangan/pinjaman/[Modal:HardDel]"
export const loanHDel = (loanId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'loanHDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/loans/hard-delete/' + loanId,
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
      const loan = response.loan;
      dispatch(loanHardDel(loan.id));
      dispatch(detailsItem({ id: 'pinjaman', total: total - 1 }));
      toastr.success('Sukses', `Menghapus data.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
