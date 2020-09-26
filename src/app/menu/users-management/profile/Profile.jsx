import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { reset } from "redux-form";
import { profileFetch } from "./redux/profileApi";
import { SITE_ADDRESS } from "../../../common/util/siteConfig";
import profileDefault from "../../../../images/user-default.png";
import background from "../../../../images/default-background.jpg";
import ProfileForm from "./ProfileForm";
import { Searchbar } from "../../../common/components/Searchbar";
import { Profilecard } from "../../../common/components/Profilecard";

const mapState = (state) => ({
  profile: state.profile,
  auth: state.auth,
  loading: state.async.loading,
});
const actions = {
  profileFetch,
  reset,
};

class Profile extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const {
      auth,
      profile,
      loading,
      location,
      profileFetch,
      reset,
    } = this.props;
    return (
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable">
            <div className="column">
              <div className="box">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/pengaturan-user/profil/info`}>Profil</Link>
                    </li>
                    <li className="is-active">
                      <Link
                        to={`/pengaturan-user/profil/info`}
                        aria-current="page"
                      >
                        Detail
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="level">
                  <div className="level-left">
                    <Searchbar id="search-user" placeholder="Cari user" />
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-3-desktop is-12-mobile">
                    <Profilecard
                      background={background}
                      profileDefault={profileDefault}
                      auth={auth}
                      profile={profile}
                      link={SITE_ADDRESS}
                    />
                  </div>
                  <div className="column">
                    <ProfileForm
                      auth={auth}
                      profile={profile}
                      loading={loading}
                      pathname={location.pathname}
                      profileFetch={profileFetch}
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
}

export default connect(mapState, actions)(Profile);
