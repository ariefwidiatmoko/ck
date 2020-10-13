import { createReducer } from '../../../../common/util/reducerUtils';
import { STAFFS_GET, STAFF_UPDATE } from './reduxConstant';

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

export default createReducer(initialState, {
  [STAFFS_GET]: staffsGet,
  [STAFF_UPDATE]: staffUpdate,
});
