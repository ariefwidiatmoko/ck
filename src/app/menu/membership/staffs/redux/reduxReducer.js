import { createReducer } from '../../../../common/util/reducerUtils';
import { STAFFS_GET, STAFF_UPDATE, STAFF_SET, STAFF_UNSET } from './reduxConstant';

const initialState = [];

const staffsGet = (state, payload) => {
  return [...payload.staffs];
};

const staffUpdate = (state, payload) => {
  return [
    ...state.filter((staff) => staff.id !== payload.staff.id),
    payload.staff,
  ];
};

const staffSet = (state, payload) => {
  return [...state.filter((staff) => staff.id !== payload.staff.id), payload.staff];
};

const staffUnset = (state, payload) => {
  return [...state.filter((staff) => staff.id !== payload.staffId)];
};

export default createReducer(initialState, {
  [STAFFS_GET]: staffsGet,
  [STAFF_UPDATE]: staffUpdate,
  [STAFF_SET]: staffSet,
  [STAFF_UNSET]: staffUnset,
});
