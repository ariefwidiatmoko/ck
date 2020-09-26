import React, { Component } from "react";
import { withRouter, Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { profileEdit } from "./redux/profileApi";
import { profilePasswordReset } from "./redux/profileApi";
import ProfileTab from "./ProfileTab";
import ProfileBasic from "./ProfileBasic";
import ProfileAbout from "./ProfileAbout";
import ProfileAccount from "./ProfileAccount";
import ProfilePictures from "./Pictures/ProfilePictures";

const actions = { profileEdit, profilePasswordReset };

class ProfileForm extends Component {
  _isMounted = false;
  state = {
    initialValues: {},
    toggle: false,
  };

  componentDidMount = () => {
    this._isMounted = true;
    const { auth, profileFetch } = this.props;
    const userId = auth.userId;
    const token = auth.token;
    profileFetch(userId, token);
    setTimeout(() => {
      this.updateInitialValues();
      this.handleToggle();
    }, 200);
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  updateInitialValues = () => {
    const { profile, auth } = this.props;
    const setInitialUser = Object.keys(auth).reduce((object, key) => {
      if (key === "email") {
        object[key] = auth[key];
      }
      return object;
    }, {});
    const setInitialValues = { ...setInitialUser, ...profile };
    if (this._isMounted) {
      this.setState({
        initialValues: setInitialValues,
      });
    }
  };

  handleToggle = (value) => {
    let setToggle;
    if (value === true) {
      setToggle = true;
    } else if (
      value === false &&
      this.state.initialValues.religion === "Other"
    ) {
      setToggle = false;
    } else if (this.state.initialValues.religion === "Other") {
      setToggle = true;
    }
    if (this._isMounted) {
      this.setState({
        toggle: setToggle,
      });
    }
  };

  onFormSubmit = async (values) => {
    const { auth, profileEdit, profilePasswordReset } = this.props;
    try {
      if (values.newPassword1 === undefined) {
        const religionDetail =
          values.religion !== "other" ? null : values.religionDetail;
        if (values.dob) {
          values.dob =
            typeof values.dob !== "string"
              ? values.dob.toISOString()
              : values.dob;
        }
        const newValues = {
          ...values,
          religionDetail: religionDetail,
          updatedBy: auth.userId,
        };
        await profileEdit(newValues, auth);
      }
      if (values.newPassword1 !== undefined) {
        const newPass = {
          id: auth.userId,
          resetPassword: values.newPassword1,
          updatedBy: auth.userId,
        };
        await profilePasswordReset(newPass, auth);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { pathname, profile, auth, loading, reset } = this.props;
    const { initialValues, toggle } = this.state;
    return (
      <div className="box">
        <ProfileTab pathname={pathname} />
        <Switch>
          <Redirect
            exact
            from={`/pengaturan-user/profil`}
            to={`/pengaturan-user/profil/info`}
          />
          <Route
            path={`/pengaturan-user/profil/info`}
            render={() => (
              <ProfileBasic
                initialValues={initialValues}
                loading={loading}
                updateProfile={this.onFormSubmit}
                reset={reset}
                updateInitialValues={this.updateInitialValues}
              />
            )}
          />
          <Route
            path={`/pengaturan-user/profil/tentang`}
            render={() => (
              <ProfileAbout
                initialValues={initialValues}
                loading={loading}
                updateProfile={this.onFormSubmit}
                reset={reset}
                updateInitialValues={this.updateInitialValues}
                handleToggle={this.handleToggle}
                toggle={toggle}
              />
            )}
          />
          <Route
            path={`/pengaturan-user/profil/foto`}
            render={() => (
              <ProfilePictures
                auth={auth}
                profile={profile}
                initialValues={initialValues}
                loading={loading}
                updateProfile={this.onFormSubmit}
              />
            )}
          />
          <Route
            path={`/pengaturan-user/profil/akun`}
            render={() => (
              <ProfileAccount
                initialValues={auth}
                loading={loading}
                updatePassword={this.onFormSubmit}
                reset={reset}
                updateInitialValues={this.updateInitialValues}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(ProfileForm));
