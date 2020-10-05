import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import userIsAuthenticated from '../common/util/authWrapper';
import Navbar from '../menu/navbar/Navbar';
import Login from '../menu/login/Login';
import Dashboard from '../menu/dashboard/Dashboard';
import ProfileView from '../menu/users-management/profile/View';
import MembersIndex from '../menu/membership/members/Index';
import MemberForm from '../menu/membership/members/Form';
import MemberView from '../menu/membership/members/View';
import MembersImport from '../menu/membership/members/Import';
import UsersIndex from '../menu/users-management/Users/Index';
import UserView from '../menu/users-management/Users/View';
import UserAdd from '../menu/users-management/Users/Add';
import UserEdit from '../menu/users-management/Users/Edit';
import UserImport from '../menu/users-management/Users/Import';
import ActivationIndex from '../menu/users-management/Activation/Index';
import RoleIndex from '../menu/users-management/Roles/Index';
import RoleForm from '../menu/users-management/Roles/Form';
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
              component={userIsAuthenticated(ProfileView)}
            />
            <Route
              exact
              path='/pengaturan-user/user'
              component={userIsAuthenticated(UsersIndex)}
            />
            <Route
              exact
              path='/pengaturan-user/user/detail/:id'
              component={userIsAuthenticated(UserView)}
            />
            <Route
              exact
              path='/pengaturan-user/user/tambah'
              component={userIsAuthenticated(UserAdd)}
            />
            <Route
              exact
              path='/pengaturan-user/user/edit/:id'
              component={userIsAuthenticated(UserEdit)}
            />
            <Route
              path='/pengaturan-user/user/import'
              component={userIsAuthenticated(UserImport)}
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
              component={userIsAuthenticated(ProfileView)}
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
