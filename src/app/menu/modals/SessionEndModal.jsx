import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router';
import { SITE_ADDRESS } from '../../common/util/siteConfig';
import { postSessionLogin, postSessionLogout } from '../login/redux/authApi';
import UserProfile from '../../../images/user-default.png';
import CustomTextInput from '../../common/form/CustomTextInput';

const mapState = (state) => ({
  auth: state.auth,
  loading: state.async.loading,
  initialValues: { username: state.auth.username },
});

const actions = {
  postSessionLogin,
  postSessionLogout,
};

class SessionEndModal extends Component {
  state = {
    showLogin: false,
  };

  onClickLogin = () => {
    this.setState((prevState) => ({
      showLogin: !prevState.showLogin,
    }));
  };

  handleLogin = (values) => {
    const { history } = this.props;
    this.props.postSessionLogin(values, history);
  };

  handleSwitchUser = () => {
    const { history } = this.props;
    this.props.postSessionLogout('switchUser', history);
  };

  render() {
    const {
      auth,
      initialValues,
      handleSubmit,
      loading,
      pristine,
      invalid,
      error,
    } = this.props;

    return (
      <div className='modal is-active'>
        <div
          className='modal-background'
          style={{ backgroundColor: 'black', opacity: 0.93 }}
        ></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title has-text-primary'>
              <i className='fas fa-lock icon'></i>
              {auth.username ? ' Sesi Berakhir' : ' Login Kembali'}
            </p>
            {this.state.showLogin && (
              <button
                disabled={loading}
                className={
                  loading
                    ? 'button custom-grey is-small is-rounded is-outlined is-loading'
                    : 'button custom-grey is-small is-rounded is-outlined'
                }
                style={{ marginLeft: 15 }}
                onClick={this.handleSwitchUser}
              >
                Ganti User
              </button>
            )}
          </header>
          <section className='modal-card-body'>
            {!this.state.showLogin && (
              <div>
                <br />
                <p className='has-text-centered'>
                  {auth.username
                    ? 'Sesi anda telah berakhir, anda perlu login.'
                    : 'Anda harus login kembali.'}
                </p>
                <p className='has-text-centered' style={{ marginTop: 15 }}>
                  <button
                    className='button is-rounded is-primary is-outlined'
                    onClick={this.onClickLogin}
                  >
                    Login
                  </button>
                </p>
                <br />
              </div>
            )}
            {this.state.showLogin && (
              <LoginForm
                auth={auth}
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                loading={loading}
                pristine={pristine}
                invalid={invalid}
                error={error}
                handleLogin={this.handleLogin}
              />
            )}
          </section>
          <footer className='modal-card-foot'></footer>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'reauthenticateForm', enableReinitialize: true })(
      SessionEndModal
    )
  )
);

class LoginForm extends Component {
  render() {
    const {
      auth,
      handleSubmit,
      error,
      invalid,
      loading,
      pristine,
      handleLogin,
    } = this.props;
    return (
      <div className='box'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image is-128x128' style={{ marginTop: '2.4em' }}>
              <img
                className='is-rounded'
                src={
                  auth.mainPhoto ? SITE_ADDRESS + auth.mainPhoto : UserProfile
                }
                alt='Profile'
              />
            </figure>
          </div>
          <div className='media-content'>
            <div className='content'>
              <div className='title'>Login</div>
              <form onSubmit={handleSubmit(handleLogin)} autoComplete='off'>
                <Field
                  name='username'
                  disabled={auth.username ? 'disabled' : ''}
                  type='text'
                  component={CustomTextInput}
                  placeholder='Username'
                  label='Username'
                  icon='user'
                />
                <Field
                  name='password'
                  type='password'
                  component={CustomTextInput}
                  placeholder='Password'
                  label='Password'
                  icon='lock'
                />
                <div className='field'>
                  {error && <p className='help is-danger'>{error}</p>}
                  <button
                    disabled={invalid || loading || pristine}
                    className={
                      loading
                        ? 'button is-link is-small is-rounded is-outlined is-loading'
                        : 'button is-link is-small is-rounded is-outlined'
                    }
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
