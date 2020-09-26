import { createReducer } from "../../../../common/util/reducerUtils";
import {
  MEMBERS_GET,
  MEMBER_CREATE,
  MEMBER_UPDATE,
  MEMBER_SOFT_DELETE,
  MEMBER_DELETE,
  MEMBERS_EXPORT,
} from "./reduxConstant";
import { membersExport } from "./reduxAction";

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

const memberSoftDelete = (state, payload) => {
  return [...state.filter((member) => member.id !== payload.member.id)];
};

const memberDelete = (state, payload) => {
  return [...state.filter((member) => member.id !== payload.member.id)];
};

export default createReducer(initialState, {
  [MEMBERS_GET]: membersGet,
  [MEMBER_CREATE]: memberCreate,
  [MEMBER_UPDATE]: memberUpdate,
  [MEMBER_SOFT_DELETE]: memberSoftDelete,
  [MEMBER_DELETE]: memberDelete,
  [MEMBERS_EXPORT]: membersExport,
});
