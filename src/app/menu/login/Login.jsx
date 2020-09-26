import React, { Component, Fragment } from "react";
import {
  withRouter,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  combineValidators,
  isRequired,
} from "revalidate";
import { reduxForm, Field } from "redux-form";
import CustomTextInput from "../../common/form/CustomTextInput";
import LoginPicture from "../../../images/meteor.png";
import { postAuthLogin } from "./redux/authApi";
import { bindActionCreators } from "redux";
import { Button } from "../../common/components/Button";
const mapState = (state) => ({
  auth: state.auth,
  loading: state.async.loading,
});
const actions = (dispatch) =>
  bindActionCreators(
    {
      authLogin: postAuthLogin,
    },
    dispatch
  );

const validate = combineValidators({
  username: isRequired({ message: "Username is required" }),
  password: isRequired({ message: "Password is required" }),
});

class Login extends Component {
  handleLogin = async (authData) => {
    await this.props.authLogin(authData);
  };
  render() {
    const { handleSubmit, auth, error, loading } = this.props;
    if (auth.isAuth === true) return <Redirect to="/dashboard" />;
    return (
      <Fragment>
        <section className="hero is-fullheight" style={{ marginTop: -52 }}>
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column  is-one-fifth-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-third-fullhd"></div>
                <div className="column is-three-fifths-tablet is-half-desktop is-half-widescreen is-one-third-fullhd is-centered">
                  <div className="box">
                    <div className="media">
                      <div className="media-left">
                        <figure
                          className="image is-128x128"
                          style={{ marginTop: "2.4em" }}
                        >
                          <img src={LoginPicture} alt="Login" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <div className="title">Login</div>
                          <form
                            onSubmit={handleSubmit(this.handleLogin)}
                            autoComplete="off"
                          >
                            <Field
                              name="username"
                              type="text"
                              component={CustomTextInput}
                              placeholder="Username"
                              autoComplete="new-password"
                              label="Username"
                              icon="user"
                            />
                            <Field
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              component={CustomTextInput}
                              placeholder="Password"
                              label="Password"
                              icon="lock"
                            />
                            <div className="field" style={{ marginTop: 25 }}>
                              {error && (
                                <p className="help is-danger">{error}</p>
                              )}
                              <Button
                                type="submit"
                                disabled={loading}
                                style={{ marginRight: 10 }}
                                className="button is-link is-small is-rounded is-outlined"
                                loading={loading}
                                label="Submit"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(mapState, actions)(reduxForm({ form: "formLogin", validate })(Login))
);
