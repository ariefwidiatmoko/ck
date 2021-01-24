import {
  MEMBERS_GET,
  MEMBER_CREATE,
  MEMBER_UPDATE,
  MEMBER_DELETE,
  MEMBER_RESTORE,
  MEMBER_HARDDEL,
  MEMBERS_EXPORT,
  MEMBERS_IMPORT,
} from './reduxConstant';

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

export const memberRestore = (memberId) => {
  return {
    type: MEMBER_RESTORE,
    payload: {
      memberId,
    },
  };
};

export const memberHardDel = (memberId) => {
  return {
    type: MEMBER_HARDDEL,
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

export const membersImport = (membersImport) => {
  return {
    type: MEMBERS_IMPORT,
    payload: {
      membersImport,
    },
  };
};
