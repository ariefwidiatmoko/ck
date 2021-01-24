import {
  INSTALLMENTS_GET,
  INSTALLMENT_GET,
  INSTALLMENT_CREATE,
  INSTALLMENT_UPDATE,
  INSTALLMENT_DELETE,
  INSTALLMENT_RESTORE,
  INSTALLMENT_HARDDEL,
  INSTALLMENTS_EXPORT,
  INSTALLMENTS_IMPORT,
} from './reduxConstant';

export const installmentsGet = (installments) => {
  return {
    type: INSTALLMENTS_GET,
    payload: {
      installments,
    },
  };
};

export const installmentGet = (installment) => {
  return {
    type: INSTALLMENT_GET,
    payload: {
      installment,
    },
  };
};

export const installmentCreate = (installment) => {
  return {
    type: INSTALLMENT_CREATE,
    payload: {
      installment,
    },
  };
};

export const installmentUpdate = (installment) => {
  return {
    type: INSTALLMENT_UPDATE,
    payload: {
      installment,
    },
  };
};

export const installmentDelete = (installmentId) => {
  return {
    type: INSTALLMENT_DELETE,
    payload: {
      installmentId,
    },
  };
};

export const installmentRestore = (installmentId) => {
  return {
    type: INSTALLMENT_RESTORE,
    payload: {
      installmentId,
    },
  };
};

export const installmentHardDel = (installmentId) => {
  return {
    type: INSTALLMENT_HARDDEL,
    payload: {
      installmentId,
    },
  };
};

export const installmentsExport = (installmentsExport) => {
  return {
    type: INSTALLMENTS_EXPORT,
    payload: {
      installmentsExport,
    },
  };
};

export const installmentsImport = (installmentsImport) => {
  return {
    type: INSTALLMENTS_IMPORT,
    payload: {
      installmentsImport,
    },
  };
};
