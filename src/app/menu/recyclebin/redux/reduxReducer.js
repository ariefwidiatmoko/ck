import { createReducer } from '../../../common/util/reducerUtils';
import {
  RECYCLEBINS_GET,
  RECYCLEBIN_DELETE,
  RECYCLEBIN_RESTORE,
} from './reduxConstant';

const initialState = [];

const recyclebinsGet = (state, payload) => {
  return [...payload.items];
};

const recyclebinRestore = (state, payload) => {
  return [...state.filter((item) => item.itemId !== payload.itemId)];
};

const recyclebinDelete = (state, payload) => {
  return [...state.filter((item) => item.itemId !== payload.itemId)];
};

export default createReducer(initialState, {
  [RECYCLEBINS_GET]: recyclebinsGet,
  [RECYCLEBIN_RESTORE]: recyclebinRestore,
  [RECYCLEBIN_DELETE]: recyclebinDelete,
});
