import { createReducer } from '../../../../common/util/reducerUtils';
import {
  USERS_GET,
  USER_CREATE,
  USER_PROFILE_UPDATE,
  USER_DELETE,
} from './reduxConstant';

const initialState = [];

const usersGet = (state, payload) => {
  return [...payload.users];
};

const userCreate = (state, payload) => {
  return [...state, payload.user];
};

const userProfileUpdate = (state, payload) => {
  return [...state.filter((user) => user.id !== payload.user.id), payload.user];
};

const userDelete = (state, payload) => {
  return [...state.filter((user) => user.id !== payload.userId)];
};

export default createReducer(initialState, {
  [USERS_GET]: usersGet,
  [USER_CREATE]: userCreate,
  [USER_PROFILE_UPDATE]: userProfileUpdate,
  [USER_DELETE]: userDelete,
});
