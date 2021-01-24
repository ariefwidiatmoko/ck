import {
  RECEPTIONS_GET,
  RECEPTION_CREATE,
  RECEPTION_UPDATE,
  RECEPTION_DELETE,
  RECEPTION_RESTORE,
  RECEPTION_HARDDEL,
  RECEPTIONS_EXPORT,
  RECEPTIONS_IMPORT,
} from './reduxConstant';

export const receptionsGet = (receptions) => {
  return {
    type: RECEPTIONS_GET,
    payload: {
      receptions,
    },
  };
};

export const receptionCreate = (reception) => {
  return {
    type: RECEPTION_CREATE,
    payload: {
      reception,
    },
  };
};

export const receptionUpdate = (reception) => {
  return {
    type: RECEPTION_UPDATE,
    payload: {
      reception,
    },
  };
};

export const receptionDelete = (receptionId) => {
  return {
    type: RECEPTION_DELETE,
    payload: {
      receptionId,
    },
  };
};

export const receptionRestore = (receptionId) => {
  return {
    type: RECEPTION_RESTORE,
    payload: {
      receptionId,
    },
  };
};

export const receptionHardDel = (receptionId) => {
  return {
    type: RECEPTION_HARDDEL,
    payload: {
      receptionId,
    },
  };
};

export const receptionsExport = (receptionsExport) => {
  return {
    type: RECEPTIONS_EXPORT,
    payload: {
      receptionsExport,
    },
  };
};

export const receptionsImport = (receptionsImport) => {
  return {
    type: RECEPTIONS_IMPORT,
    payload: {
      receptionsImport,
    },
  };
};
