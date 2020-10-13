import { USERS_IMPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const usersImport = (state, payload) => {
  return [...payload.usersImport];
};

export default createReducer(initialState, {
  [USERS_IMPORT]: usersImport,
});
