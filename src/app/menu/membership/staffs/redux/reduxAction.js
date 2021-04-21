import { STAFFS_GET, STAFF_SET, STAFF_UPDATE, STAFF_UNSET } from './reduxConstant';

export const staffsGet = (staffs) => {
  return {
    type: STAFFS_GET,
    payload: {
      staffs,
    },
  };
};

export const staffUpdate = (staff) => {
  return {
    type: STAFF_UPDATE,
    payload: {
      staff,
    },
  };
};

export const staffSet = (staff) => {
  return {
    type: STAFF_SET,
    payload: {
      staff,
    },
  };
};

export const staffUnset = (staffId) => {
  return {
    type: STAFF_UNSET,
    payload: {
      staffId,
    },
  };
};
