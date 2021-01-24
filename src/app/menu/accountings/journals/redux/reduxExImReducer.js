import { JOURNALS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const journalsImport = (state, payload) => {
  return [...payload.journalsImport];
};

export default createReducer(initialState, {
  [JOURNALS_IMPORT]: journalsImport,
});
