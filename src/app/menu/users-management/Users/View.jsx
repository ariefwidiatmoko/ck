import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userFetch } from './redux/reduxApi';
import EditTab from './EditTab';
import ViewBasic from './ViewBasic';
import ViewAccount from './ViewAccount';
import ViewRole from './ViewRole';
import background from '../../../../images/default-background.jpg';
import profileDefault from '../../../../images/user-default.png';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import { Profilecard } from '../../../common/components/Profilecard';

const mapState = (state, ownProps) => {
  const userId = ownProps.match.params.id;

  let aS = {};
  if (state.auth) {
    aS = state.auth.arrAuth.detail.subm.filter((i) => i.id === 'user')[0];
  }

  let user = {};
  if (state.users && state.users.length > 0) {
    user = state.users.filter((user) => user.id === Number(userId))[0];
  }
  return {
    auth: state.auth,
    aS: aS,
    user: user,
    roles: state.roles,
  };
};

const actions = {
  userFetch,
};

class View extends Component {
  _isMounted = false;
  state = {
    userId: this.props.match.params.id,
    user: this.props.user,
    activeTab: 'basic',
  };

  componentDidMount = () => {
    this._isMounted = true;
    const { auth, userFetch } = this.props;
    const { userId } = this.state;
    userFetch(userId, auth);
    setTimeout(() => {
      this.updateInitialValues();
    }, 100);
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  updateInitialValues = () => {
    const { user } = this.props;
    const setUser = { ...user };
    if (this._isMounted) {
      this.setState({
        user: setUser,
      });
    }
  };

  OnChangeActiveTab = (activeTab) => {
    this.setState({
      activeTab: activeTab,
    });
  };

  render() {
    const { roles, aS } = this.props;
    const { userId, user } = this.state;
    const profile = user && user.profile ? user.profile : null;
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
                            <Link to={`/pengaturan-user/user/${userId}`}>
                              Detail
                            </Link>
                          </li>
                          <li className='is-active'>
                            <Link to={`/users-management/user/${userId}`}>
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
                        {aS.u === true && (
                          <Link
                            to={'/pengaturan-user/user/edit/' + userId}
                            className='button is-small is-primary is-rounded is-outlined'
                          >
                            <i className='fas fa-pen icon' />
                          </Link>
                        )}
                        {aS.c === true && (
                          <Link
                            to='/pengaturan-user/user/tambah'
                            className='button is-small is-primary is-rounded is-outlined'
                          >
                            <i className='fas fa-plus icon' />
                          </Link>
                        )}
                        <Link
                          to='/pengaturan-user/user'
                          className='button custom-grey is-small is-rounded is-outlined'
                        >
                          <i className='fas fa-arrow-left icon' />
                        </Link>
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
                        <ViewBasic user={user} />
                      )}
                      {this.state.activeTab === 'account' && (
                        <ViewAccount user={user} roles={roles} />
                      )}
                      {this.state.activeTab === 'role' && (
                        <ViewRole user={user} roles={roles} />
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

export default withRouter(connect(mapState, actions)(View));
