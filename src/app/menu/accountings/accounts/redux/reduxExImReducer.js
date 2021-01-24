import { ACCOUNTS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const accountsImport = (state, payload) => {
  return [...payload.accountsImport];
};

export default createReducer(initialState, {
  [ACCOUNTS_IMPORT]: accountsImport,
});
