import { PROFILE_UPDATE } from "./profileConstant";
import { createReducer } from "../../../../common/util/reducerUtils";

const initialState = {};

const profileUpdate = (state, payload) => {
  return { ...state, ...payload.profile };
};

export default createReducer(initialState, {
  [PROFILE_UPDATE]: profileUpdate
});
