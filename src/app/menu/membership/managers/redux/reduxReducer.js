import { createReducer } from '../../../../common/util/reducerUtils';
import { MANAGERS_GET, MANAGER_UPDATE, MANAGER_SET, MANAGER_UNSET } from './reduxConstant';

const initialState = [];

const managersGet = (state, payload) => {
  return [...payload.managers];
};

const managerUpdate = (state, payload) => {
  return [
    ...state.filter((manager) => manager.id !== payload.manager.id),
    payload.manager,
  ];
};

const managerSet = (state, payload) => {
  return [...state.filter((manager) => manager.id !== payload.manager.id), payload.manager];
};

const managerUnset = (state, payload) => {
  return [...state.filter((manager) => manager.id !== payload.managerId)];
};

export default createReducer(initialState, {
  [MANAGERS_GET]: managersGet,
  [MANAGER_UPDATE]: managerUpdate,
  [MANAGER_SET]: managerSet,
  [MANAGER_UNSET]: managerUnset,
});
