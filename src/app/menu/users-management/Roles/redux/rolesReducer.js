import { ROLES_GET, ROLE_CREATE, ROLE_UPDATE, ROLE_DELETE } from "./rolesConstant";
import { createReducer } from "../../../../common/util/reducerUtils";

const initialState = [];

const rolesGet = (state, payload) => {
  return [...payload.roles];
};

const roleCreate = (state, payload) => {
  return [...state, payload.role];
};

const roleUpdate = (state, payload) => {
  return [...state.filter((role) => role.id !== payload.role.id), payload.role];
};

const roleDelete = (state, payload) => {
  return [...state.filter((role) => role.id !== payload.role.id)];
};

export default createReducer(initialState, {
  [ROLES_GET]: rolesGet,
  [ROLE_CREATE]: roleCreate,
  [ROLE_UPDATE]: roleUpdate,
  [ROLE_DELETE]: roleDelete,

});
