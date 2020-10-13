import { authLogin, authLogout } from './authAction';
import { menusGet } from '../../navbar/sidemenu/redux/menusAction';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../async/asyncConstant';
import { toastr } from 'react-redux-toastr';
import { closeModal } from '../../modals/redux/modalActions';
const jwtDecode = require('jwt-decode');

export const postAuthLogin = (creds) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'login' });
    try {
      const formData = new FormData();
      formData.append('username', creds.username);
      formData.append('password', creds.password);
      let fetchData = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: formData,
      });
      const response = await fetchData.json();
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const user = response.user;
      const menus = response.menus;
      const expiresIn = jwtDecode(user.token);
      const setUser = {
        isAuth: true,
        token: user.token,
        userId: user.userId,
        arrAuth: user.arrAuth,
        name: user.name,
        mainPhoto: user.mainPhoto,
        username: user.username,
        expiresIn: expiresIn.exp * 1000,
      };
      dispatch(menusGet(menus));
      dispatch(authLogin(setUser));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      toastr.error('Error', error.message);
      dispatch(asyncActionError());
    }
  };
};

export const postSessionLogin = (creds, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'sessionLogin' });
    try {
      const formData = new FormData();
      formData.append('username', creds.username);
      formData.append('password', creds.password);
      let fetchData = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: formData,
      });
      const response = await fetchData.json();
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const user = response.user;
      const menus = response.menus;
      const expiresIn = jwtDecode(user.token);
      const setUser = {
        isAuth: true,
        token: user.token,
        userId: user.userId,
        arrAuth: user.arrAuth,
        name: user.name,
        mainPhoto: user.mainPhoto,
        username: user.username,
        expiresIn: expiresIn.exp * 1000,
      };
      dispatch(menusGet(menus));
      dispatch(authLogin(setUser));
      dispatch(closeModal());
      history.push('/dashboard');
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      toastr.error('Error', error.message);
      dispatch(asyncActionError());
    }
  };
};

export const postSessionLogout = (elementName, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: elementName });
    try {
      history.push('/');
      dispatch(authLogout());
      dispatch(closeModal());
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      toastr.error('Error', error.message);
      dispatch(asyncActionError());
    }
  };
};
