import { createReducer } from '../../../common/util/reducerUtils';
import { RECYCLEBINS_GET, RECYCLEBIN_RESTORE } from './reduxConstant';

const initialState = [];

const recyclebinsGet = (state, payload) => {
  return [...payload.items];
};

const recyclebinRestore = (state, payload) => {
  return [...state.filter((item) => item.id !== payload.itemId)];
};

export default createReducer(initialState, {
  [RECYCLEBINS_GET]: recyclebinsGet,
  [RECYCLEBIN_RESTORE]: recyclebinRestore,
});
