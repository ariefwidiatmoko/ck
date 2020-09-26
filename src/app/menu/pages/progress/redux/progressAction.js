import {
  PROGRESS_PERCENT,
} from "./progressConstant";

export const progressPercent = (percent) => {
  return {
    type: PROGRESS_PERCENT,
    payload: {
      percent,
    },
  };
};
