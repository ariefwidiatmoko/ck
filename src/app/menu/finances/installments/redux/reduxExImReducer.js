import { INSTALLMENTS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const installmentsImport = (state, payload) => {
  return [...payload.installmentsImport];
};

export default createReducer(initialState, {
  [INSTALLMENTS_IMPORT]: installmentsImport,
});
