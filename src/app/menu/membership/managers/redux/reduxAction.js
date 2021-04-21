import { MANAGERS_GET, MANAGER_SET, MANAGER_UPDATE, MANAGER_UNSET } from './reduxConstant';

export const managersGet = (managers) => {
  return {
    type: MANAGERS_GET,
    payload: {
      managers,
    },
  };
};

export const managerUpdate = (manager) => {
  return {
    type: MANAGER_UPDATE,
    payload: {
      manager,
    },
  };
};

export const managerSet = (manager) => {
  return {
    type: MANAGER_SET,
    payload: {
      manager,
    },
  };
};

export const managerUnset = (managerId) => {
  return {
    type: MANAGER_UNSET,
    payload: {
      managerId,
    },
  };
};
