import React, { Component, Fragment } from 'react';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import Menu from './menu/Menu';
import UserProfile from '../../../../images/user-default.png';

class SideMenu extends Component {
  render() {
    const {
      auth,
      menus,
      logout,
      toggler,
      pathname,
      loading,
      elementName,
      history,
    } = this.props;
    const regex = new RegExp(`/pengaturan-user/profil/`);
    const isActive = regex.test(pathname);
    const setProfile = auth.arrAuth.detail.subm.filter((role) => {
      return role.id === 'profil-user';
    })[0];
    return (
      <Fragment>
        <div
          className={
            toggler === true
              ? 'menu-container active px-1 has-background-white'
              : 'menu-container px-1 has-background-white'
          }
        >
          <div className='menu-wrapper py-1'>
            <aside className='menu'>
              <div className='menu-list profile-sidebar'>
                <div className='media profile'>
                  <div className='media-left'>
                    <figure className='image is-48x48'>
                      <img
                        className='is-rounded'
                        alt='profile-pic'
                        src={
                          auth.mainPhoto
                            ? SITE_ADDRESS + auth.mainPhoto
                            : UserProfile
                        }
                      />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <p className='title is-6 is-capitalized'>{auth.name}</p>
                    <p className='subtitle is-7' style={{ paddingBottom: 8 }}>
                      {auth.username}
                    </p>
                  </div>
                </div>
                <div className='profile-icon'>
                  <div className='field has-addons'>
                    <p className='control'>
                      <button
                        onClick={() => history.push(`/pengaturan-user/profil`)}
                        disabled={
                          setProfile === undefined
                            ? true
                            : loading === true && elementName === 'logoutSide'
                        }
                        aria-label='Edit Profile'
                        className={
                          isActive === true
                            ? 'button has-text-primary'
                            : 'button'
                        }
                      >
                        <span className='icon shortcut-grey'>
                          <i className='fas fa-user-edit icon'></i>
                        </span>
                      </button>
                    </p>
                    <p className='control'>
                      <button
                        disabled={
                          loading === true && elementName === 'logoutSide'
                        }
                        aria-label='Notification'
                        className='button'
                      >
                        <span className='icon shortcut-grey'>
                          <i className='fas fa-bell icon'></i>
                        </span>
                      </button>
                    </p>
                    <p className='control'>
                      <button
                        disabled={
                          loading === true && elementName === 'logoutSide'
                        }
                        onClick={() => logout('logoutSide')}
                        aria-label='Logout'
                        className='button'
                      >
                        <span className='icon shortcut-red'>
                          <i
                            className={
                              loading === true && elementName === 'logoutSide'
                                ? 'fas fa-circle-notch fa-spin icon'
                                : 'fas fa-power-off icon'
                            }
                          ></i>
                        </span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <ul className='menu-list'>
                {menus.map((i) => (
                  <Menu
                    pathname={pathname}
                    key={i.id}
                    m={i}
                    c={auth.arrAuth.detail}
                  />
                ))}
              </ul>
              <br />
              <br />
            </aside>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SideMenu;
