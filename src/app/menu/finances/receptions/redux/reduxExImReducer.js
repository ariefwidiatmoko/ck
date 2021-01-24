import { RECEPTIONS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const receptionsImport = (state, payload) => {
  return [...payload.receptionsImport];
};

export default createReducer(initialState, {
  [RECEPTIONS_IMPORT]: receptionsImport,
});
