import { STAFFS_GET, STAFF_UPDATE } from './reduxConstant';

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
