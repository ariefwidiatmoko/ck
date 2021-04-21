import { createReducer } from '../../../../common/util/reducerUtils';
import { SUPERVISORS_GET, SUPERVISOR_UPDATE, SUPERVISOR_SET, SUPERVISOR_UNSET } from './reduxConstant';

const initialState = [];

const supervisorsGet = (state, payload) => {
  return [...payload.supervisors];
};

const supervisorUpdate = (state, payload) => {
  return [
    ...state.filter((supervisor) => supervisor.id !== payload.supervisor.id),
    payload.supervisor,
  ];
};

const supervisorSet = (state, payload) => {
  return [...state.filter((supervisor) => supervisor.id !== payload.supervisor.id), payload.supervisor];
};

const supervisorUnset = (state, payload) => {
  return [...state.filter((supervisor) => supervisor.id !== payload.supervisorId)];
};

export default createReducer(initialState, {
  [SUPERVISORS_GET]: supervisorsGet,
  [SUPERVISOR_UPDATE]: supervisorUpdate,
  [SUPERVISOR_SET]: supervisorSet,
  [SUPERVISOR_UNSET]: supervisorUnset,
});
