import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SideMenu from './sidemenu/SideMenu';
import { postSessionLogout } from '../login/redux/authApi';

const mapState = (state) => ({
  auth: state.auth,
  menus: state.menus,
  loading: state.async.loading,
  elementName: state.async.elementName,
});

const actions = {
  postSessionLogout,
};

export class Navbar extends Component {
  state = {
    isTogglerActive: false,
    isNavTogglerActive: false,
  };
  handleToggler = async () => {
    await this.setState({
      isTogglerActive: !this.state.isTogglerActive,
    });
  };
  handleNavToggler = async () => {
    await this.setState({
      isNavTogglerActive: !this.state.isNavTogglerActive,
    });
  };

  handleActiveLink = () => {
    const { auth, location } = this.props;
    const regex = new RegExp(`profile/${auth.userId}`);
    const isActive = regex.test(location.pathname);
    return isActive;
  };

  handleSessionLogout = (elementName) => {
    const { postSessionLogout, history } = this.props;
    postSessionLogout(elementName, history);
  };

  render() {
    const { auth, menus, location, history, loading, elementName } = this.props;
    const { isTogglerActive, isNavTogglerActive } = this.state;
    return (
      <Fragment>
        <nav className='navbar is-fixed-top box-shadow-y'>
          <div className='navbar-brand'>
            <div onClick={this.handleToggler} className='navbar-burger toggler'>
              <span />
              <span />
              <span />
            </div>
            <Link
              to='/'
              className='navbar-item is-size-6 has-text-link has-text-weight-semibold'
            >
              <i className='fas fa-meteor icon' style={{ marginRight: 1 }} />
              Light Dashboard
            </Link>
            <div
              onClick={this.handleNavToggler}
              className='navbar-burger nav-toggler'
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          {auth.isAuth === true && (
            <div
              className={
                isNavTogglerActive === true
                  ? 'navbar-menu is-active has-background-white'
                  : 'navbar-menu has-background-white'
              }
            >
              <div className='navbar-end'>
                <div className='navbar-item has-dropdown is-hoverable'>
                  <div href='/' className='navbar-item hand-pointer'>
                    <i className='fas fa-bell icon' />
                  </div>
                  <div className='navbar-dropdown is-right'>
                    <a href='/' className='navbar-item'>
                      <span style={{ marginRight: 5 }}>Notifikasi</span>
                      <span className='badge-notification is-size-7'>
                        4 New
                      </span>
                    </a>
                    <a href='/' className='navbar-item'>
                      Pesan{' '}
                      <i className='is-invisible fas fa-circle icon has-text-info' />
                    </a>
                  </div>
                </div>
                <div className='navbar-item has-dropdown is-hoverable'>
                  <div to='/dashboard' className='navbar-item hand-pointer'>
                    <i className='fas fa-user-circle icon' />
                    <span className='is-size-7 is-capitalized'>
                      {auth.name}
                    </span>
                  </div>
                  <div className='navbar-dropdown is-right'>
                    <Link
                      to={`/pengaturan-user/profil`}
                      className={
                        this.handleActiveLink() === true
                          ? 'navbar-item is-active has-background-white-ter'
                          : 'navbar-item'
                      }
                    >
                      <i className='fas fa-user-circle icon mr-1'></i> Profil
                    </Link>
                    <Link
                      to={`/pengaturan-user/profil/akun`}
                      className='navbar-item'
                    >
                      <i className='fas fa-key icon mr-1'></i> Ubah Password
                    </Link>
                    <hr className='navbar-divider' />
                    {loading === true && elementName === 'logoutNav' ? (
                      <button
                        disabled
                        className='button is-loading is-text is-small'
                      >
                        <i className='fas fa-sign-out-alt icon mr-1'></i> Logout
                      </button>
                    ) : (
                      <Fragment>
                        <div
                          onClick={() => this.handleSessionLogout('logoutNav')}
                          className='navbar-item hand-pointer'
                        >
                          <i
                            className='fas fa-sign-out-alt icon mr-1'
                          ></i>{' '}
                          Logout
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
        {auth.isAuth === true && (
          <SideMenu
            toggler={isTogglerActive}
            auth={auth}
            menus={menus}
            logout={this.handleSessionLogout}
            loading={loading}
            elementName={elementName}
            pathname={location.pathname}
            history={history}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(connect(mapState, actions)(Navbar));
