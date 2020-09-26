import { PROFILE_UPDATE } from "./profileConstant";

export const profileUpdate = profile => {
  return {
    type: PROFILE_UPDATE,
    payload: {
      profile
    }
  };
};
