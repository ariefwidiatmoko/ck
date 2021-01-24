import {
  SAVINGS_GET,
  SAVING_CREATE,
  SAVING_UPDATE,
  SAVING_DELETE,
  SAVING_RESTORE,
  SAVING_HARDDEL,
  SAVINGS_EXPORT,
  SAVINGS_IMPORT,
} from './reduxConstant';

export const savingsGet = (savings) => {
  return {
    type: SAVINGS_GET,
    payload: {
      savings,
    },
  };
};

export const savingCreate = (saving) => {
  return {
    type: SAVING_CREATE,
    payload: {
      saving,
    },
  };
};

export const savingUpdate = (saving) => {
  return {
    type: SAVING_UPDATE,
    payload: {
      saving,
    },
  };
};

export const savingDelete = (savingId) => {
  return {
    type: SAVING_DELETE,
    payload: {
      savingId,
    },
  };
};

export const savingRestore = (savingId) => {
  return {
    type: SAVING_RESTORE,
    payload: {
      savingId,
    },
  };
};

export const savingHardDel = (savingId) => {
  return {
    type: SAVING_HARDDEL,
    payload: {
      savingId,
    },
  };
};

export const savingsExport = (savingsExport) => {
  return {
    type: SAVINGS_EXPORT,
    payload: {
      savingsExport,
    },
  };
};

export const savingsImport = (savingsImport) => {
  return {
    type: SAVINGS_IMPORT,
    payload: {
      savingsImport,
    },
  };
};
