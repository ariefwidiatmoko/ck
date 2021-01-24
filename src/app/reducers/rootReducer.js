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
import membersExImReducer from '../menu/membership/members/redux/reduxExImReducer';
import savingsReducer from '../menu/finances/savings/redux/reduxReducer';
import loansReducer from '../menu/finances/loans/redux/reduxReducer';
import installmentsReducer from '../menu/finances/installments/redux/reduxReducer';
import receptionsReducer from '../menu/finances/receptions/redux/reduxReducer';
import journalsReducer from '../menu/accountings/journals/redux/reduxReducer';
import accountsReducer from '../menu/accountings/accounts/redux/reduxReducer';
import accountsExImReducer from '../menu/accountings/accounts/redux/reduxExImReducer';
import usersReducer from '../menu/users-management/Users/redux/reduxReducer';
import usersExImReducer from '../menu/users-management/Users/redux/reduxExImReducer';
import rolesReducer from '../menu/users-management/Roles/redux/reduxReducer';
import autoJournalsReducer from '../menu/settings/autoJournal/redux/reduxReducer';
import recyclebinsReducer from '../menu/recyclebin/redux/reduxReducer';
import modalReducer from '../menu/modals/redux/modalReducer';
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
  membersExIm: membersExImReducer,
  savings: savingsReducer,
  loans: loansReducer,
  installments: installmentsReducer,
  receptions: receptionsReducer,
  journals: journalsReducer,
  accounts: accountsReducer,
  accountsExIm: accountsExImReducer,
  users: usersReducer,
  usersExIm: usersExImReducer,
  roles: rolesReducer,
  details: detailsReducer,
  progress: progressReducer,
  autoJournals: autoJournalsReducer,
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
