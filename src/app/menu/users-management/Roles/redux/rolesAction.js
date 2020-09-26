import { ROLES_GET, ROLE_CREATE, ROLE_UPDATE } from "./rolesConstant";

export const rolesGet = (roles) => {
  return {
    type: ROLES_GET,
    payload: {
      roles,
    },
  };
};

export const roleCreate = (role) => {
  return {
    type: ROLE_CREATE,
    payload: {
      role,
    },
  };
};

export const roleUpdate = (role) => {
  return {
    type: ROLE_UPDATE,
    payload: {
      role,
    },
  };
};
