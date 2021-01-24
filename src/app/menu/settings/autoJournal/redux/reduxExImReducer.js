import { AUTOJOURNALS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const autoJournalsImport = (state, payload) => {
  return [...payload.autoJournalsImport];
};

export default createReducer(initialState, {
  [AUTOJOURNALS_IMPORT]: autoJournalsImport,
});
