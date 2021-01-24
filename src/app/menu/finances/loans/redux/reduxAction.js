import {
  LOANS_GET,
  LOAN_CREATE,
  LOAN_UPDATE,
  LOAN_DELETE,
  LOAN_RESTORE,
  LOAN_HARDDEL,
  LOANS_EXPORT,
  LOANS_IMPORT,
} from './reduxConstant';

export const loansGet = (loans) => {
  return {
    type: LOANS_GET,
    payload: {
      loans,
    },
  };
};

export const loanCreate = (loan) => {
  return {
    type: LOAN_CREATE,
    payload: {
      loan,
    },
  };
};

export const loanUpdate = (loan) => {
  return {
    type: LOAN_UPDATE,
    payload: {
      loan,
    },
  };
};

export const loanDelete = (loanId) => {
  return {
    type: LOAN_DELETE,
    payload: {
      loanId,
    },
  };
};

export const loanRestore = (loanId) => {
  return {
    type: LOAN_RESTORE,
    payload: {
      loanId,
    },
  };
};

export const loanHardDel = (loanId) => {
  return {
    type: LOAN_HARDDEL,
    payload: {
      loanId,
    },
  };
};

export const loansExport = (loansExport) => {
  return {
    type: LOANS_EXPORT,
    payload: {
      loansExport,
    },
  };
};

export const loansImport = (loansImport) => {
  return {
    type: LOANS_IMPORT,
    payload: {
      loansImport,
    },
  };
};
