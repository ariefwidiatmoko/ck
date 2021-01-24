import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from 'redux-form';
import { profileView } from './redux/profileApi';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import profileDefault from '../../../../images/user-default.png';
import background from '../../../../images/default-background.jpg';
import Form from './Form';
import { Profilecard } from '../../../common/components/Profilecard';

const mapState = (state) => ({
  profile: state.profile,
  auth: state.auth,
  loading: state.async.loading,
});
const actions = {
  profileView,
  reset,
};

function View(props) {
  const { auth, profile, loading, location, profileView, reset } = props;
  return (
    <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
      <div className='p-1'>
        <div className='columns is-variable'>
          <div className='column'>
            <div className='box'>
              <nav className='breadcrumb' aria-label='breadcrumbs'>
                <ul>
                  <li>
                    <Link to={`/pengaturan-user/profil/info`}>Profil</Link>
                  </li>
                  <li className='is-active'>
                    <Link
                      to={`/pengaturan-user/profil/info`}
                      aria-current='page'
                    >
                      Detail
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className='columns'>
                <div className='column is-3-desktop is-12-mobile'>
                  <Profilecard
                    background={background}
                    profileDefault={profileDefault}
                    auth={auth}
                    profile={profile}
                    link={SITE_ADDRESS}
                  />
                </div>
                <div className='column'>
                  <Form
                    auth={auth}
                    profile={profile}
                    loading={loading}
                    pathname={location.pathname}
                    profileView={profileView}
                    reset={reset}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapState, actions)(View);
