import {
  savingsGet,
  savingCreate,
  savingUpdate,
  savingDelete,
  savingRestore,
  savingHardDel,
  // savingsImport,
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

// url: /keuangan/simpanan
export const savingsIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'savingsIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      const search = st;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', search);
      const fetchData = await fetch(SITE_ADDRESS + 'api/savings', {
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
      dispatch(detailsItem({ id: 'simpanan', total: response.total }));
      dispatch(savingsGet(response.savings));
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
// url: "/keuangan/simpanan/tambah"
export const savingAdd = (values, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'savingAdd' });
    const formData = new FormData();
    const random = customAlphabet(NUM_ALPHABET, 5);
    const code = `${yearMonth()}${dateDay()[0]}-SP${random()}`;
    const date = values.date.toISOString();
    formData.append('code', code);
    formData.append(
      'primary',
      values.primary !== undefined ? values.primary : null
    );
    formData.append(
      'secondary',
      values.secondary !== undefined ? values.secondary : null
    );
    formData.append(
      'tertier',
      values.tertier !== undefined ? values.tertier : null
    );
    formData.append('date', date);
    formData.append('profileId', values.id);
    formData.append('createdBy', auth.userId);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/savings/create', {
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
      const saving = response.saving;
      dispatch(detailsItem({ id: 'simpanan', total: total + 1 }));
      dispatch(savingCreate(saving));
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
export const savingEdit = (values, auth, savingId) => {
  console.log(values.date);
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'savingEdit' });
    const formData = new FormData();
    formData.append(
      'savingPrimary',
      values.savingPrimary !== null
        ? values.savingPrimary.length > 0
          ? values.savingPrimary
          : null
        : null
    );
    formData.append(
      'savingSecondary',
      values.savingSecondary !== null
        ? values.savingSecondary.length > 0
          ? values.savingSecondary
          : null
        : null
    );
    formData.append(
      'savingTertier',
      values.savingTertier !== null
        ? values.savingTertier.length > 0
          ? values.savingTertier
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
        SITE_ADDRESS + 'api/savings/update/' + savingId,
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
      const saving = response.saving;
      dispatch(savingUpdate(saving));
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
export const savingDel = (savingId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'savingDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/savings/delete/' + savingId,
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
      const saving = response.saving;
      dispatch(detailsItem({ id: 'simpanan', total: total - 1 }));
      dispatch(savingDelete(saving.id));
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
export const savingRes = (savingId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payloadd: 'savingRestore' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/savings/restore/' + savingId,
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
      const saving = response.saving;
      dispatch(detailsItem({ id: 'simpanan', total: total - 1 }));
      dispatch(savingRestore(saving.id));
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
export const savingHDel = (savingId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'savingHDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/savings/hard-delete/' + savingId,
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
      const saving = response.saving;
      dispatch(savingHardDel(saving.id));
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
