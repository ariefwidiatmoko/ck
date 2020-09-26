import {
  MEMBERS_GET,
  MEMBER_CREATE,
  MEMBER_UPDATE,
  MEMBER_SOFT_DELETE,
  MEMBER_DELETE,
  MEMBERS_EXPORT,
} from "./reduxConstant";

export const membersGet = (members) => {
  return {
    type: MEMBERS_GET,
    payload: {
      members,
    },
  };
};

export const memberCreate = (member) => {
  return {
    type: MEMBER_CREATE,
    payload: {
      member,
    },
  };
};

export const memberUpdate = (member) => {
  return {
    type: MEMBER_UPDATE,
    payload: {
      member,
    },
  };
};

export const memberSoftDelete = (memberId) => {
  return {
    type: MEMBER_SOFT_DELETE,
    payload: {
      memberId,
    },
  };
};

export const memberDelete = (memberId) => {
  return {
    type: MEMBER_DELETE,
    payload: {
      memberId,
    },
  };
};

export const membersExport = (membersExport) => {
  return {
    type: MEMBERS_EXPORT,
    payload: {
      membersExport,
    },
  };
};
