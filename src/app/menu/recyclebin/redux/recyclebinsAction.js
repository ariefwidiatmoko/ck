import { RECYCLEBINS_GET, RECYCLEBIN_RESTORE } from "./recyclebinConstant";

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
    type: RECYCLEBIN_RESTORE,
    payload: {
      itemId,
    },
  };
};


