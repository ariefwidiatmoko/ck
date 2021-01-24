import { createReducer } from '../../../../common/util/reducerUtils';
import {
  LOANS_GET,
  LOAN_CREATE,
  LOAN_UPDATE,
  LOAN_DELETE,
  LOAN_RESTORE,
  LOAN_HARDDEL,
} from './reduxConstant';

const initialState = [];

const loansGet = (state, payload) => {
  return [...payload.loans];
};

const loanCreate = (state, payload) => {
  const objs = [...state, payload.loan];
  const objsSort = objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
  if (objsSort.length > 10) {
    objsSort.splice(-1, 1);
    return objsSort;
  }
  return objsSort;
};

const loanUpdate = (state, payload) => {
  const objs = [
    ...state.filter((loan) => loan.id !== payload.loan.id),
    payload.loan,
  ];
  return objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
};

const loanDelete = (state, payload) => {
  return [...state.filter((loan) => loan.id !== payload.loanId)];
};

const loanRestore = (state, payload) => {
  return [...state.filter((loan) => loan.id !== payload.loanId)];
};

const loanHardDel = (state, payload) => {
  return [...state.filter((loan) => loan.id !== payload.loanId)];
};

export default createReducer(initialState, {
  [LOANS_GET]: loansGet,
  [LOAN_CREATE]: loanCreate,
  [LOAN_UPDATE]: loanUpdate,
  [LOAN_DELETE]: loanDelete,
  [LOAN_RESTORE]: loanRestore,
  [LOAN_HARDDEL]: loanHardDel,
});
