import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_UPDATE
} from "./authConstant";
import { createReducer } from "../../../common/util/reducerUtils";

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  arrAuth: [],
  name: null,
  username: null,
  mainPhoto: null,
  expiresIn: null
};

const authLogin = (state, payload) => {
  return { ...state, ...payload.auth };
};

const authLogout = state => {
  return {
    isAuth: false,
    token: null,
    userId: null,
    arrAuth: [],
    name: null,
    username: null,
    mainPhoto: null,
    expiresIn: null
  };
};

const authUpdate = (state, payload) => {
  return {
    ...state,
    ...payload.auth
  }
}

export default createReducer(initialState, {
  [AUTH_LOGIN]: authLogin,
  [AUTH_LOGOUT]: authLogout,
  [AUTH_UPDATE]: authUpdate
});
