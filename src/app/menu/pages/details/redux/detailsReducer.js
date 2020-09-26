import { createReducer } from "../../../../common/util/reducerUtils";
import {
  DETAILS_ITEM,
} from "./detailsConstant";

const initialState = [];

const detailsItem = (state, payload) => {
    return [...state.filter((detail) => detail.id !== payload.details.id), payload.details];
};

export default createReducer(initialState, {
  [DETAILS_ITEM]: detailsItem,
});
