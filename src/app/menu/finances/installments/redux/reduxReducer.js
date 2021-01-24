import { createReducer } from '../../../../common/util/reducerUtils';
import {
  INSTALLMENTS_GET,
  INSTALLMENT_GET,
  INSTALLMENT_CREATE,
  INSTALLMENT_UPDATE,
  INSTALLMENT_DELETE,
  INSTALLMENT_RESTORE,
  INSTALLMENT_HARDDEL,
} from './reduxConstant';

const initialState = [];

const installmentsGet = (state, payload) => {
  return [...payload.installments];
};

const installmentGet = (state, payload) => {
  const objs = [
    ...state.filter((installment) => installment.id !== payload.installment.id),
    payload.installment,
  ];
  return objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
};

const installmentCreate = (state, payload) => {
  const objs = [
    ...state.filter((installment) => installment.id !== payload.installment.id),
    payload.installment,
  ];
  return objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
};

const installmentUpdate = (state, payload) => {
  const objs = [
    ...state.filter((installment) => installment.id !== payload.installment.id),
    payload.installment,
  ];
  return objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
};

const installmentDelete = (state, payload) => {
  return [
    ...state.filter((installment) => installment.id !== payload.installmentId),
  ];
};

const installmentRestore = (state, payload) => {
  return [
    ...state.filter((installment) => installment.id !== payload.installmentId),
  ];
};

const installmentHardDel = (state, payload) => {
  return [
    ...state.filter((installment) => installment.id !== payload.installmentId),
  ];
};

export default createReducer(initialState, {
  [INSTALLMENTS_GET]: installmentsGet,
  [INSTALLMENT_GET]: installmentGet,
  [INSTALLMENT_CREATE]: installmentCreate,
  [INSTALLMENT_UPDATE]: installmentUpdate,
  [INSTALLMENT_DELETE]: installmentDelete,
  [INSTALLMENT_RESTORE]: installmentRestore,
  [INSTALLMENT_HARDDEL]: installmentHardDel,
});
