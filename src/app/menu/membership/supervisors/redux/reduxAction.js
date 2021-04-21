import { SUPERVISORS_GET, SUPERVISOR_SET, SUPERVISOR_UPDATE, SUPERVISOR_UNSET } from './reduxConstant';

export const supervisorsGet = (supervisors) => {
  return {
    type: SUPERVISORS_GET,
    payload: {
      supervisors,
    },
  };
};

export const supervisorUpdate = (supervisor) => {
  return {
    type: SUPERVISOR_UPDATE,
    payload: {
      supervisor,
    },
  };
};

export const supervisorSet = (supervisor) => {
  return {
    type: SUPERVISOR_SET,
    payload: {
      supervisor,
    },
  };
};

export const supervisorUnset = (supervisorId) => {
  return {
    type: SUPERVISOR_UNSET,
    payload: {
      supervisorId,
    },
  };
};
