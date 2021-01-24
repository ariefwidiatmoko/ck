import { LOANS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const loansImport = (state, payload) => {
  return [...payload.loansImport];
};

export default createReducer(initialState, {
  [LOANS_IMPORT]: loansImport,
});
