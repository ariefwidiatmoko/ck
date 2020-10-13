import { createReducer } from '../../../../common/util/reducerUtils';
import {
  MEMBERS_GET,
  MEMBER_CREATE,
  MEMBER_UPDATE,
  MEMBER_DELETE,
  MEMBER_HARD_DELETE,
} from './reduxConstant';

const initialState = [];

const membersGet = (state, payload) => {
  return [...payload.members];
};

const memberCreate = (state, payload) => {
  return [...state, payload.member];
};

const memberUpdate = (state, payload) => {
  return [
    ...state.filter((member) => member.id !== payload.member.id),
    payload.member,
  ];
};

const memberDelete = (state, payload) => {
  return [...state.filter((member) => member.id !== payload.member.id)];
};

const memberHardDelete = (state, payload) => {
  return [...state.filter((member) => member.id !== payload.member.id)];
};

export default createReducer(initialState, {
  [MEMBERS_GET]: membersGet,
  [MEMBER_CREATE]: memberCreate,
  [MEMBER_UPDATE]: memberUpdate,
  [MEMBER_DELETE]: memberDelete,
  [MEMBER_HARD_DELETE]: memberHardDelete,
});
