import {
  ACCOUNTS_GET,
  ACCOUNT_CREATE,
  ACCOUNT_UPDATE,
  ACCOUNT_DELETE,
  ACCOUNT_HARD_DELETE,
  ACCOUNTS_EXPORT,
  ACCOUNTS_IMPORT,
} from './reduxConstant';

export const accountsGet = (accounts) => {
  return {
    type: ACCOUNTS_GET,
    payload: {
      accounts,
    },
  };
};

export const accountCreate = (account) => {
  return {
    type: ACCOUNT_CREATE,
    payload: {
      account,
    },
  };
};

export const accountUpdate = (account) => {
  return {
    type: ACCOUNT_UPDATE,
    payload: {
      account,
    },
  };
};

export const accountDelete = (accountId) => {
  return {
    type: ACCOUNT_DELETE,
    payload: {
      accountId,
    },
  };
};

export const accountHardDelete = (accountId) => {
  return {
    type: ACCOUNT_HARD_DELETE,
    payload: {
      accountId,
    },
  };
};

export const accountsExport = (accountsExport) => {
  return {
    type: ACCOUNTS_EXPORT,
    payload: {
      accountsExport,
    },
  };
};

export const accountsImport = (accountsImport) => {
  return {
    type: ACCOUNTS_IMPORT,
    payload: {
      accountsImport,
    },
  };
};
