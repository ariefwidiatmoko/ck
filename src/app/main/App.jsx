import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import isAuthenticated from '../common/util/authWrapper';
import Navbar from '../menu/navbar/Navbar';
import Login from '../menu/login/Login';
import Dashboard from '../menu/dashboard/Dashboard';
import ProfileView from '../menu/users-management/profile/View';
import MembersIndex from '../menu/membership/members/Index';
import StaffsIndex from '../menu/membership/staffs/Index';
import MemberForm from '../menu/membership/members/Form';
import MemberView from '../menu/membership/members/View';
import MembersImport from '../menu/membership/members/Import';
import AccountsIndex from '../menu/finances/accounts/Index';
import AccountsImport from '../menu/finances/accounts/Import';
import UsersIndex from '../menu/users-management/Users/Index';
import UserView from '../menu/users-management/Users/View';
import UserAdd from '../menu/users-management/Users/Add';
import UserEdit from '../menu/users-management/Users/Edit';
import UserImport from '../menu/users-management/Users/Import';
import ActivationIndex from '../menu/users-management/Activation/Index';
import RoleIndex from '../menu/users-management/Roles/Index';
import RoleForm from '../menu/users-management/Roles/Form';
import ModalManager from '../menu/modals/ModalManager';
import RecyclebinIndex from '../menu/recyclebin/Index';
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
              component={isAuthenticated(Dashboard)}
            />
            <Route
              exact
              path='/keanggotaan/anggota'
              component={isAuthenticated(MembersIndex)}
            />
            <Route
              exact
              path='/keanggotaan/anggota/tambah'
              component={isAuthenticated(MemberForm)}
            />
            <Route
              exact
              path='/keanggotaan/anggota/detail/:id'
              component={isAuthenticated(MemberView)}
            />
            <Route
              exact
              path='/keanggotaan/anggota/edit/:id'
              component={isAuthenticated(MemberForm)}
            />
            <Route
              exact
              path='/keanggotaan/anggota/import'
              component={isAuthenticated(MembersImport)}
            />
            <Route
              exact
              path='/keanggotaan/pengurus'
              component={isAuthenticated(StaffsIndex)}
            />
            <Route
              exact
              path='/keuangan/akun'
              component={isAuthenticated(AccountsIndex)}
            />
            <Route
              exact
              path='/keuangan/akun/import'
              component={isAuthenticated(AccountsImport)}
            />
            <Route
              path='/pengaturan-user/profil'
              component={isAuthenticated(ProfileView)}
            />
            <Route
              exact
              path='/pengaturan-user/user'
              component={isAuthenticated(UsersIndex)}
            />
            <Route
              exact
              path='/pengaturan-user/user/detail/:id'
              component={isAuthenticated(UserView)}
            />
            <Route
              exact
              path='/pengaturan-user/user/tambah'
              component={isAuthenticated(UserAdd)}
            />
            <Route
              exact
              path='/pengaturan-user/user/edit/:id'
              component={isAuthenticated(UserEdit)}
            />
            <Route
              path='/pengaturan-user/user/import'
              component={isAuthenticated(UserImport)}
            />
            <Route
              exact
              path='/pengaturan-user/aktivasi'
              component={isAuthenticated(ActivationIndex)}
            />
            <Route
              exact
              path='/pengaturan-user/role'
              component={isAuthenticated(RoleIndex)}
            />
            <Route
              path='/pengaturan-user/role/tambah'
              component={isAuthenticated(RoleForm)}
            />
            <Route
              path='/pengaturan-user/role/edit/:id'
              component={isAuthenticated(RoleForm)}
            />
            <Route
              path='/pengaturan-umum/profil-koperasi'
              component={isAuthenticated(ProfileView)}
            />
            <Route
              path='/recyclebin'
              component={isAuthenticated(RecyclebinIndex)}
            />
            <Route path='/testarea' component={isAuthenticated(Testarea)} />
          </Switch>
        </Fragment>
      </Fragment>
    );
  }
}

export default withRouter(App);
