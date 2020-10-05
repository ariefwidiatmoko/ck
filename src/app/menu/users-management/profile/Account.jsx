import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  hasLengthGreaterThan,
  matchesField,
} from 'revalidate';
import TextInput from '../../../common/form/TextInput';

const validate = combineValidators({
  newPassword1: composeValidators(
    hasLengthGreaterThan(1)({
      message: 'Password needs to be at least 2 characters',
    })
  )(),
  newPassword2: composeValidators(
    matchesField('newPassword1')({ message: 'Password do not match' })
  )(),
});

class Account extends Component {
  render() {
    const {
      error,
      pristine,
      invalid,
      submitting,
      handleSubmit,
      updatePassword,
    } = this.props;

    return (
      <Fragment>
        <Field
          name='username'
          disabled='disabled'
          type='text'
          component={TextInput}
          placeholder='Username'
          label='Username'
        />
        <form autoComplete='off' onSubmit={handleSubmit(updatePassword)}>
          <div className='field is-horizontal'>
            <div className='field-body'>
              <Field
                label='Password Baru'
                name='newPassword1'
                type='password'
                component={TextInput}
                placeholder='Password Baru'
                className='is-expanded'
              />
              <Field
                label='Password Konfirmasi'
                name='newPassword2'
                type='password'
                component={TextInput}
                placeholder='Password Konfirmasi'
                className='is-expanded'
              />
            </div>
          </div>
          {error && <p className='help is-danger'>{error}</p>}
          <div
            className='field is-grouped'
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <div className='control'>
              <button
                type='submit'
                disabled={submitting || invalid || pristine}
                className={
                  submitting
                    ? 'button is-primary is-small is-rounded is-outlined is-loading'
                    : 'button is-primary is-small is-rounded is-outlined'
                }
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'profileAccount',
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.reset('profileAccount'));
    props.updateInitialValues();
  },
  validate,
})(Account);
