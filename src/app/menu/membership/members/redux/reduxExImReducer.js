import { MEMBERS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const membersImport = (state, payload) => {
  return [...payload.membersImport];
};

export default createReducer(initialState, {
  [MEMBERS_IMPORT]: membersImport,
});
