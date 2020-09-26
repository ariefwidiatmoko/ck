import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_UPDATE } from "./authConstant";

export const authLogin = auth => {
  return {
    type: AUTH_LOGIN,
    payload: {
      auth
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const authUpdate = auth => {
  return {
    type: AUTH_UPDATE,
    payload: {
      auth
    }
  };
};
