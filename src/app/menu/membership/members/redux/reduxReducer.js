import { createReducer } from '../../../../common/util/reducerUtils';
import {
  MEMBERS_GET,
  MEMBER_CREATE,
  MEMBER_UPDATE,
  MEMBER_DELETE,
  MEMBER_RESTORE,
  MEMBER_HARDDEL,
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
  return [...state.filter((member) => member.id !== payload.memberId)];
};

const memberRestore = (state, payload) => {
  return [...state.filter((member) => member.id !== payload.memberId)];
};

const memberHardDelete = (state, payload) => {
  return [...state.filter((member) => member.id !== payload.memberId)];
};

export default createReducer(initialState, {
  [MEMBERS_GET]: membersGet,
  [MEMBER_CREATE]: memberCreate,
  [MEMBER_UPDATE]: memberUpdate,
  [MEMBER_DELETE]: memberDelete,
  [MEMBER_RESTORE]: memberRestore,
  [MEMBER_HARDDEL]: memberHardDelete,
});
