import { USERS_EXPORT } from './reduxConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const usersExport = (state, payload) => {
  return [...payload.usersExport];
};

export default createReducer(initialState, {
  [USERS_EXPORT]: usersExport,
});
