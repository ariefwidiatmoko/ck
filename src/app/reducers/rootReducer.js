import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import menusReducer from '../menu/navbar/sidemenu/redux/menusReducer';
import authReducer from '../menu/login/redux/authReducer';
import profileReducer from '../menu/users-management/profile/redux/profileReducer';
import testReducer from '../menu/testarea/redux/testReducer';
import asyncReducer from '../async/asyncReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import membersReducer from '../menu/membership/members/redux/reduxReducer';
import usersReducer from '../menu/users-management/Users/redux/reduxReducer';
import rolesReducer from '../menu/users-management/Roles/redux/rolesReducer';
import recyclebinsReducer from '../menu/recyclebin/redux/recyclebinsReducer';
import modalReducer from '../menu/modals/redux/modalReducer';
import usersExportReducer from '../menu/users-management/Users/redux/reduxExportReducer';
import progressReducer from '../menu/pages/progress/redux/progressReducer';
import detailsReducer from '../menu/pages/details/redux/detailsReducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const appReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  members: membersReducer,
  users: usersReducer,
  usersExport: usersExportReducer,
  roles: rolesReducer,
  details: detailsReducer,
  progress: progressReducer,
  toastr: toastrReducer,
  form: formReducer,
  async: asyncReducer,
  modals: modalReducer,
  menus: menusReducer,
  recyclebins: recyclebinsReducer,
  test: testReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    state = initialState;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
