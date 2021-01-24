import {
  JOURNALS_GET,
  JOURNAL_CREATE,
  JOURNAL_UPDATE,
  JOURNAL_DELETE,
  JOURNAL_RESTORE,
  JOURNAL_HARDDEL,
  JOURNALS_EXPORT,
  JOURNALS_IMPORT,
} from './reduxConstant';

export const journalsGet = (journals) => {
  return {
    type: JOURNALS_GET,
    payload: {
      journals,
    },
  };
};

export const journalCreate = (journal) => {
  return {
    type: JOURNAL_CREATE,
    payload: {
      journal,
    },
  };
};

export const journalUpdate = (journal) => {
  return {
    type: JOURNAL_UPDATE,
    payload: {
      journal,
    },
  };
};

export const journalDelete = (journalId) => {
  return {
    type: JOURNAL_DELETE,
    payload: {
      journalId,
    },
  };
};

export const journalRestore = (journalId) => {
  return {
    type: JOURNAL_RESTORE,
    payload: {
      journalId,
    },
  };
};

export const journalHardDel = (journalId) => {
  return {
    type: JOURNAL_HARDDEL,
    payload: {
      journalId,
    },
  };
};

export const journalsExport = (journalsExport) => {
  return {
    type: JOURNALS_EXPORT,
    payload: {
      journalsExport,
    },
  };
};

export const journalsImport = (journalsImport) => {
  return {
    type: JOURNALS_IMPORT,
    payload: {
      journalsImport,
    },
  };
};
