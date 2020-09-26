import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import userIsAuthenticated from '../common/util/authWrapper';
import Navbar from '../menu/navbar/Navbar';
import Login from '../menu/login/Login';
import Dashboard from '../menu/dashboard/Dashboard';
import Profile from '../menu/users-management/profile/Profile';
import MembersIndex from '../menu/membership/members/Index';
import MemberForm from '../menu/membership/members/Form';
import MemberView from '../menu/membership/members/View';
import UsersIndex from '../menu/users-management/Users/Index';
import UserFormView from '../menu/users-management/Users/UserFormView';
import UserFormCreate from '../menu/users-management/Users/UserFormCreate';
import UserFormEdit from '../menu/users-management/Users/UserFormEdit';
import UserFormExport from '../menu/users-management/Users/UserFormExport';
import ActivationIndex from '../menu/users-management/Activation/ActivationIndex';
import RoleIndex from '../menu/users-management/Roles/RoleIndex';
import RoleForm from '../menu/users-management/Roles/RoleForm';
import ModalManager from '../menu/modals/ModalManager';
import RecyclebinIndex from '../menu/recyclebin/RecyclebinIndex';
import Testarea from '../menu/testarea/TestareaComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Fragment>
          <Navbar />
          <Switch key={this.props.location.key}>
            <Route exact path='/' component={Login} />
            <Route
              path='/dashboard'
              component={userIsAuthenticated(Dashboard)}
            />
            <Route
              exact
              path='/keanggotaan/anggota'
              component={userIsAuthenticated(MembersIndex)}
            />
            <Route
              exact
              path='/keanggotaan/anggota/tambah'
              component={userIsAuthenticated(MemberForm)}
            />
            <Route
              exact
              path='/keanggotaan/anggota/detail/:id'
              component={userIsAuthenticated(MemberView)}
            />
            <Route
              exact
              path='/keanggotaan/anggota/edit/:id'
              component={userIsAuthenticated(MemberForm)}
            />
            <Route
              path='/pengaturan-user/profil'
              component={userIsAuthenticated(Profile)}
            />
            <Route
              exact
              path='/pengaturan-user/user'
              component={userIsAuthenticated(UsersIndex)}
            />
            <Route
              exact
              path='/pengaturan-user/user/detail/:id'
              component={userIsAuthenticated(UserFormView)}
            />
            <Route
              exact
              path='/pengaturan-user/user/tambah'
              component={userIsAuthenticated(UserFormCreate)}
            />
            <Route
              exact
              path='/pengaturan-user/user/edit/:id'
              component={userIsAuthenticated(UserFormEdit)}
            />
            <Route
              path='/pengaturan-user/user/export'
              component={userIsAuthenticated(UserFormExport)}
            />
            <Route
              exact
              path='/pengaturan-user/aktivasi'
              component={userIsAuthenticated(ActivationIndex)}
            />
            <Route
              exact
              path='/pengaturan-user/role'
              component={userIsAuthenticated(RoleIndex)}
            />
            <Route
              path='/pengaturan-user/role/tambah'
              component={userIsAuthenticated(RoleForm)}
            />
            <Route
              path='/pengaturan-user/role/edit/:id'
              component={userIsAuthenticated(RoleForm)}
            />
            <Route
              path='/pengaturan-umum/profil-koperasi'
              component={userIsAuthenticated(Profile)}
            />
            <Route
              path='/recyclebin'
              component={userIsAuthenticated(RecyclebinIndex)}
            />
            <Route path='/testarea' component={userIsAuthenticated(Testarea)} />
          </Switch>
        </Fragment>
      </Fragment>
    );
  }
}

export default withRouter(App);
