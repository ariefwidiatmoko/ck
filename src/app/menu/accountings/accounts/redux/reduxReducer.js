import { createReducer } from '../../../../common/util/reducerUtils';
import {
  ACCOUNTS_GET,
  ACCOUNT_CREATE,
  ACCOUNT_UPDATE,
  ACCOUNT_DELETE,
  ACCOUNT_RESTORE,
  ACCOUNT_HARDDEL,
} from './reduxConstant';

const initialState = [];

const accountsGet = (state, payload) => {
  return [...payload.accounts];
};

const accountCreate = (state, payload) => {
  const objs = [...state, payload.account];
  return objs.sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0));
};

const accountUpdate = (state, payload) => {
  const objs = [
    ...state.filter((account) => account.id !== payload.account.id),
    payload.account,
  ];
  return objs.sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0));
};

const accountDelete = (state, payload) => {
  const objs = [
    ...state.filter((account) => account.id !== payload.accountId),
  ];
  return objs.sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0));
};

const accountRestore = (state, payload) => {
  return [...state.filter((account) => account.id !== payload.accountId)];
};

const accountHardDel = (state, payload) => {
  return [...state.filter((account) => account.id !== payload.accountId)];
};

export default createReducer(initialState, {
  [ACCOUNTS_GET]: accountsGet,
  [ACCOUNT_CREATE]: accountCreate,
  [ACCOUNT_UPDATE]: accountUpdate,
  [ACCOUNT_DELETE]: accountDelete,
  [ACCOUNT_RESTORE]: accountRestore,
  [ACCOUNT_HARDDEL]: accountHardDel,
});
