import {
  USERS_GET,
  USER_CREATE,
  USER_PROFILE_UPDATE,
  USER_DELETE,
  USERS_EXPORT,
} from './reduxConstant';

export const usersGet = (users) => {
  return {
    type: USERS_GET,
    payload: {
      users,
    },
  };
};

export const userCreate = (user) => {
  return {
    type: USER_CREATE,
    payload: {
      user,
    },
  };
};

export const userProfileUpdate = (user) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: {
      user,
    },
  };
};

export const userDelete = (userId) => {
  return {
    type: USER_DELETE,
    payload: {
      userId,
    },
  };
};

export const usersExport = (usersExport) => {
  return {
    type: USERS_EXPORT,
    payload: {
      usersExport,
    },
  };
};
