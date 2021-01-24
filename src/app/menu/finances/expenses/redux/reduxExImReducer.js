import { SAVINGS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const savingsImport = (state, payload) => {
  return [...payload.savingsImport];
};

export default createReducer(initialState, {
  [SAVINGS_IMPORT]: savingsImport,
});
