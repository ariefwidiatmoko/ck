import {
  AUTOJOURNALS_GET,
  AUTOJOURNAL_CREATE,
  AUTOJOURNAL_UPDATE,
  AUTOJOURNAL_DELETE,
  AUTOJOURNAL_RESTORE,
  AUTOJOURNAL_HARDDEL,
  AUTOJOURNALS_EXPORT,
  AUTOJOURNALS_IMPORT,
} from './reduxConstant';

export const autoJournalsGet = (autoJournals) => {
  return {
    type: AUTOJOURNALS_GET,
    payload: {
      autoJournals,
    },
  };
};

export const autoJournalCreate = (autoJournal) => {
  return {
    type: AUTOJOURNAL_CREATE,
    payload: {
      autoJournal,
    },
  };
};

export const autoJournalUpdate = (autoJournal) => {
  return {
    type: AUTOJOURNAL_UPDATE,
    payload: {
      autoJournal,
    },
  };
};

export const autoJournalDelete = (autoJournalId) => {
  return {
    type: AUTOJOURNAL_DELETE,
    payload: {
      autoJournalId,
    },
  };
};

export const autoJournalRestore = (autoJournalId) => {
  return {
    type: AUTOJOURNAL_RESTORE,
    payload: {
      autoJournalId,
    },
  };
};

export const autoJournalHardDel = (autoJournalId) => {
  return {
    type: AUTOJOURNAL_HARDDEL,
    payload: {
      autoJournalId,
    },
  };
};

export const autoJournalsExport = (autoJournalsExport) => {
  return {
    type: AUTOJOURNALS_EXPORT,
    payload: {
      autoJournalsExport,
    },
  };
};

export const autoJournalsImport = (autoJournalsImport) => {
  return {
    type: AUTOJOURNALS_IMPORT,
    payload: {
      autoJournalsImport,
    },
  };
};
