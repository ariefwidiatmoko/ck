import { RECYCLEBINS_GET, RECYCLEBIN_DELETE } from './reduxConstant';

export const recyclebinsGet = (items) => {
  return {
    type: RECYCLEBINS_GET,
    payload: {
      items,
    },
  };
};

export const recyclebinRestore = (itemId) => {
  return {
    type: RECYCLEBIN_DELETE,
    payload: {
      itemId,
    },
  };
};

export const recyclebinDelete = (itemId) => {
  return {
    type: RECYCLEBIN_DELETE,
    payload: {
      itemId,
    },
  };
};
