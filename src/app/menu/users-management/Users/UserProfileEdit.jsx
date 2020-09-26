import React, {Component} from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import ProfileTab from "../../profile/ProfileTab";
import ProfileBasic from "../../profile/ProfileBasic";
import ProfileAbout from "../../profile/ProfileAbout";
import ProfilePictures from "../../profile/Pictures/ProfilePictures";

class UserProfileEdit extends Component {
  render() {
      const {profile, loading, pathname, initialValues, updateUser} = this.props
    return (
      <div className="box">
        <ProfileTab pathname={pathname} />
        <Switch>
          <Redirect
            exact
            from={`/pengaturan-user/user/edit/${initialValues.id}`}
            to={`/pengaturan-user/user/edit/${initialValues.id}/basic`}
          />
          <Route
            path={`/pengaturan-user/user/edit/${initialValues.id}/basic`}
            render={() => (
              <ProfileBasic
                initialValues={profile}
                loading={loading}
                updateProfile={updateUser}
              />
            )}
          />
          <Route
            path={`/pengaturan-user/user/edit/${initialValues.id}/about`}
            render={() => (
              <ProfileAbout
                initialValues={profile}
                loading={loading}
                updateProfile={updateUser}
              />
            )}
          />
          <Route
            path={`/pengaturan-user/user/edit/${initialValues.id}/pictures`}
            render={() => (
              <ProfilePictures
                initialValues={profile}
                loading={loading}
                updateProfile={updateUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default UserProfileEdit;
