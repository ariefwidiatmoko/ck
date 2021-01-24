import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import { userAdd } from './redux/reduxApi';

const mapState = (state) => ({
  loading: state.async.loading,
  auth: state.auth,
});

const actions = {
  userAdd,
};

const validate = combineValidators({
  username: composeValidators(
    isRequired({ message: 'Username harus diisi' }),
    hasLengthGreaterThan(2)({
      message: 'Username harus memiliki paling sedikit 3 karakter',
    })
  )(),
  name: isRequired({ message: 'Panggilan harus diisi' }),
  password: composeValidators(
    isRequired({ message: 'Password harus diisi' }),
    hasLengthGreaterThan(5)({
      message: 'Password harus memiliki paling sedikit 6 karakter',
    })
  )(),
});

class Add extends Component {
  onFormSubmit = async (values) => {
    const { auth, history } = this.props;
    try {
      await this.props.userAdd(values, auth, history);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { history, invalid, loading, pristine } = this.props;
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
                        <ul>
                          <li className='is-active'>
                            <Link to='/pengaturan-user/user'>User</Link>
                          </li>
                          <li className='is-active'>
                            <Link to='/pengaturan-user/user/tambah'>
                              Tambah
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
                          disabled={invalid || loading || pristine}
                          onClick={this.props.handleSubmit(this.onFormSubmit)}
                          className={
                            loading
                              ? 'button is-small is-primary is-rounded is-outlined is-loading'
                              : 'button is-small is-primary is-rounded is-outlined'
                          }
                        >
                          <i className='fas fa-save icon' />
                        </button>
                        <button
                          type='button'
                          onClick={this.props.history.goBack}
                          className='button custom-grey is-small is-rounded is-outlined'
                        >
                          <i className='fas fa-arrow-left icon' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='columns'>
                  <div className='column is-third-quarter'>
                    <form
                      onSubmit={this.props.handleSubmit(this.onFormSubmit)}
                      autoComplete='off'
                    >
                      <Field
                        name='name'
                        type='text'
                        component={TextInput}
                        placeholder='Panggilan'
                        label='Panggilan'
                      />
                      <Field
                        name='username'
                        type='text'
                        component={TextInput}
                        placeholder='Username'
                        label='Username'
                      />
                      <Field
                        name='password'
                        type='password'
                        component={TextInput}
                        placeholder='Password'
                        label='Password'
                      />
                      <div
                        className='field is-grouped'
                        style={{ marginTop: 20, marginBottom: 20 }}
                      >
                        <div className='control'>
                          <button
                            type='submit'
                            disabled={invalid || loading || pristine}
                            className={
                              loading
                                ? 'button is-primary is-small is-rounded is-outlined is-loading'
                                : 'button is-primary is-small is-rounded is-outlined'
                            }
                          >
                            <i className='fas fa-save icon' />
                          </button>
                        </div>
                        <div className='control'>
                          <button
                            onClick={() => history.goBack()}
                            className='button custom-grey is-small is-rounded is-outlined'
                          >
                            <i className='fas fa-arrow-left icon' />
                          </button>
                        </div>
                      </div>
                    </form>
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

export default withRouter(
  connect(mapState, actions)(reduxForm({ form: 'userAdd', validate })(Add))
);
