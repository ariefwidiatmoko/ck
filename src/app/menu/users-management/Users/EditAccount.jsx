import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  hasLengthGreaterThan,
} from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import { Button } from '../../../common/components/Button';

const validate = combineValidators({
  username: composeValidators(
    hasLengthGreaterThan(2)({
      message: 'Username harus memiliki paling sedikit 3 karakter',
    })
  )(),
  newPassword1: composeValidators(
    hasLengthGreaterThan(1)({
      message: 'Password harus memiliki paling sedikit 2 karakter',
    })
  )(),
});

class EditAccount extends Component {
  render() {
    const {
      onFormSubmit,
      handleSubmit,
      invalid,
      submitting,
      pristine,
      history,
      errorMessage,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
        <Field
          name='username'
          type='text'
          component={TextInput}
          placeholder='Username'
          label='Username'
        />
        <Field
          label='Reset Password'
          name='newPassword1'
          autoComplete='off'
          type='password'
          component={TextInput}
          placeholder='Reset Password'
          className='is-expanded'
        />
        {errorMessage && <p className='help is-danger'>{errorMessage}</p>}
        <div
          className='field is-grouped'
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <div className='control'>
            <Button
              type='submit'
              disabled={invalid || submitting || pristine}
              className='button is-primary is-small is-rounded is-outlined'
              loading={submitting}
              icon='save'
            />
          </div>
          <div className='control'>
            <button
              onClick={() => history.goBack()}
              className='button custom-grey is-small is-rounded is-outlined'
              type='button'
            >
              <i className='fas fa-arrow-left icon' />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'userEditAccount',
  onSubmitSuccess: (result, dispatch, props) => {
    setTimeout(() => {
      dispatch(props.reset('userEditAccount'));
    }, 200);
  },
  validate,
  enableReinitialize: true,
})(EditAccount);
