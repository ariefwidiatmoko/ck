import { createReducer } from '../../../../common/util/reducerUtils';
import {
  ACCOUNTS_GET,
  ACCOUNT_CREATE,
  ACCOUNT_UPDATE,
  ACCOUNT_DELETE,
  ACCOUNT_HARD_DELETE,
} from './reduxConstant';

const initialState = [];

const accountsGet = (state, payload) => {
  return [...payload.accounts];
};

const accountCreate = (state, payload) => {
  return [...state, payload.account];
};

const accountUpdate = (state, payload) => {
  return [
    ...state.filter((account) => account.id !== payload.account.id),
    payload.account,
  ];
};

const accountDelete = (state, payload) => {
  return [...state.filter((account) => account.id !== payload.account.id)];
};

const accountHardDelete = (state, payload) => {
  return [...state.filter((account) => account.id !== payload.account.id)];
};

export default createReducer(initialState, {
  [ACCOUNTS_GET]: accountsGet,
  [ACCOUNT_CREATE]: accountCreate,
  [ACCOUNT_UPDATE]: accountUpdate,
  [ACCOUNT_DELETE]: accountDelete,
  [ACCOUNT_HARD_DELETE]: accountHardDelete,
});
