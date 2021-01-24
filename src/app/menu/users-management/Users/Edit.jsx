import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import {
  userView,
  userRolesIndex,
  userEdit,
  userAccountEdit,
  userRoleEdit,
} from './redux/reduxApi';
import { arrKeyValue } from '../../../common/helpers/objectHelpers';
import EditTab from './EditTab';
import EditBasic from './EditBasic';
import EditAccount from './EditAccount';
import EditRole from './EditRole';
import background from '../../../../images/default-background.jpg';
import profileDefault from '../../../../images/user-default.png';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import { Profilecard } from '../../../common/components/Profilecard';

const mapState = (state, ownProps) => {
  const userId = ownProps.match.params.id;
  const users = state.users;
  let user = {};
  if (users && users.length > 0) {
    user = state.users.filter((user) => user.id === Number(userId))[0];
  }
  return {
    user: user,
    roles: state.roles,
    auth: state.auth,
    loading: state.async.loading,
  };
};

const actions = {
  userView,
  userRolesIndex,
  userEdit,
  userAccountEdit,
  userRoleEdit,
  reset,
};

class Edit extends Component {
  state = {
    userId: this.props.match.params.id,
    activeTab: 'basic',
    initialValues: {},
    toggle: false,
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount = async () => {
    const { auth, userView } = this.props;
    const { userId } = this.state;
    await userView(userId, auth);
    this.updateInitialValues();
    this.handleToggle();
  };

  updateInitialValues = () => {
    const { user } = this.props;
    const setUser = { ...user };
    this.setState({
      initialValues: setUser,
    });
  };

  handleToggle = (value) => {
    const { user } = this.props;
    const profile = user && user.profile ? user.profile : null;
    let setToggle;
    if (value === true) {
      setToggle = true;
    } else if (value === false && profile && profile.religion === 'Lainnya') {
      setToggle = false;
    } else if (profile && profile.religion === 'Lainnya') {
      setToggle = true;
    }
    this.setState({
      toggle: setToggle,
    });
  };

  OnChangeActiveTab = (activeTab) => {
    this.setState({
      activeTab: activeTab,
    });
  };

  onFormSubmit = async (values) => {
    console.log(values);
    const { auth, userEdit } = this.props;
    const { userId } = this.state;
    try {
      const religionDetail =
        values.religion !== 'Lainnya' ? null : values.religionDetail;
      const dob = !isNaN(values.dob)
        ? typeof values.dob === 'number'
          ? new Date(values.dob).toISOString()
          : values.dob.toISOString()
        : null;
      const getHob = values.hobbies;
      const hobbies =
        getHob !== null
          ? getHob.toString().length() > 0
            ? getHob.toString()
            : null
          : null;
      const newValues = {
        ...values,
        id: userId,
        dob: dob,
        hobbies: hobbies,
        religionDetail: religionDetail,
      };
      await userEdit(newValues, auth);
    } catch (error) {
      console.log(error);
    }
  };

  onFormAccountSubmit = (values) => {
    const { auth, userAccountEdit } = this.props;
    let updateAccount = {};
    updateAccount.username = values.username;
    // check if password is not empty
    if (values.newPassword1 !== undefined) {
      updateAccount.resetPassword = values.newPassword1;
    }
    updateAccount.updatedBy = auth.userId;
    updateAccount.id = this.state.userId;
    userAccountEdit(updateAccount, auth);
  };

  onFormRoleSubmit = (values) => {
    const { auth, roles, userRoleEdit, history } = this.props;
    const { userId } = this.state;
    const allRoles = arrKeyValue(roles, values.roles, 'roleName', 'id');
    userRoleEdit(allRoles, userId, auth, history);
  };

  render() {
    const {
      auth,
      user,
      history,
      loading,
      roles,
      userRolesIndex,
      reset,
    } = this.props;
    const { userId, initialValues, toggle } = this.state;
    const profile = user && user.profile ? user.profile : null;
    const allRoles =
      user.roles && user.roles.toString().length > 0
        ? user.roles.toString().split(',')
        : [];
    const initRoles = arrKeyValue(roles, allRoles, 'id', 'roleName');
    if (allRoles.toString().split(',')[0]) {
      allRoles
        .toString()
        .split(',')
        .forEach((role) => {
          if (role === 'SA') {
            initRoles.push('Superadmin');
          }
        });
    }
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable'>
            <div className='column is-fullwidth'>
              <div className='box'>
                <div className='level'>
                  <div className='level-left'>
                    <div className='level-item'>
                      <nav
                        className='breadcrumb is-size-7'
                        aria-label='breadcrumbs'
                      >
                        <ul className='margin-10-25'>
                          <li>
                            <Link to='/pengaturan-user/user'>User</Link>
                          </li>
                          <li className='is-active'>
                            <Link to={`/pengaturan-user/user/edit/${userId}`}>
                              Edit
                            </Link>
                          </li>
                          <li className='is-active'>
                            <Link to={`/pengaturan-user/user/edit/${userId}`}>
                              {user.username}
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      <div className='buttons'>
                        <button
                          onClick={() => this.props.history.goBack()}
                          className='button custom-grey is-small is-rounded is-outlined'
                        >
                          <i className='fas fa-arrow-left icon' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='columns'>
                  <div className='column is-3-desktop is-12-mobile'>
                    <Profilecard
                      background={background}
                      profileDefault={profileDefault}
                      auth={{
                        name: profile ? profile.name : '',
                        username: user ? user.username : '',
                      }}
                      profile={profile ? profile : ''}
                      link={SITE_ADDRESS}
                    />
                  </div>
                  <div className='column'>
                    <div className='box'>
                      <EditTab
                        onChangeActiveTab={this.OnChangeActiveTab}
                        activeTab={this.state.activeTab}
                        userId={userId}
                      />
                      {this.state.activeTab === 'basic' && (
                        <EditBasic
                          initialValues={initialValues.profile}
                          updateInitialValues={this.updateInitialValues}
                          loading={loading}
                          history={history}
                          reset={reset}
                          onFormSubmit={this.onFormSubmit}
                          handleToggle={this.handleToggle}
                          toggle={toggle}
                        />
                      )}
                      {this.state.activeTab === 'account' && (
                        <EditAccount
                          initialValues={user}
                          loading={loading}
                          onFormSubmit={this.onFormAccountSubmit}
                          history={history}
                          auth={auth}
                          reset={reset}
                        />
                      )}
                      {this.state.activeTab === 'role' && (
                        <EditRole
                          auth={auth}
                          roles={roles}
                          rolesFetch={userRolesIndex}
                          loading={loading}
                          history={history}
                          initialValues={{ allRoles: initRoles }}
                          onFormSubmit={this.onFormRoleSubmit}
                          reset={reset}
                          updateInitialValues={this.updateInitialValues}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapState, actions)(Edit));
