import {
  DETAILS_ITEM,
} from "./detailsConstant";

export const detailsItem = (details) => {
  return {
    type: DETAILS_ITEM,
    payload: {
      details,
    },
  };
};
