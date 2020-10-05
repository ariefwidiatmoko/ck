import {
  MEMBERS_GET,
  MEMBER_CREATE,
  MEMBER_UPDATE,
  MEMBER_DELETE,
  MEMBER_HARD_DELETE,
  MEMBERS_EXPORT,
  MEMBERS_IMPORT,
  RESET_IMPORT,
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

export const memberDelete = (memberId) => {
  return {
    type: MEMBER_DELETE,
    payload: {
      memberId,
    },
  };
};

export const memberHardDelete = (memberId) => {
  return {
    type: MEMBER_HARD_DELETE,
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

export const membersImport = (membersExport) => {
  return {
    type: MEMBERS_IMPORT,
    payload: {
      membersImport,
    },
  };
};

export const resetImport = (resetImport) => {
  return {
    type: RESET_IMPORT,
    payload: {
      resetImport,
    },
  };
};
