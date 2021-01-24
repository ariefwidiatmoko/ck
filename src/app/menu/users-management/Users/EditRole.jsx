import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import MultiSelectInput from '../../../common/form/MultiSelectInput';

class EditRole extends Component {
  state = {
    allRoles: [],
  };
  componentDidMount = () => {
    const { auth, rolesFetch, roles } = this.props;
    const token = auth.token;
    rolesFetch(token);
    let getRoles = [];
    roles.forEach((role, index) => {
      getRoles[index] = role.name;
    });
    this.setState({
      allRoles: getRoles,
    });
  };

  render() {
    const {
      onFormSubmit,
      handleSubmit,
      loading,
      pristine,
      history,
    } = this.props;
    const { allRoles } = this.state;
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
        <Field
          label='Role'
          name='roles'
          placeholder='Pilih Role'
          component={MultiSelectInput}
          data={allRoles}
        />
        <div
          className='field is-grouped'
          style={{ marginTop: 40, marginBottom: 20 }}
        >
          <div className='control'>
            <button
              type='submit'
              disabled={loading || pristine}
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
              disabled={loading}
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
  form: 'userEditRole',
  onSubmitSuccess: (result, dispatch, props) => {
    setTimeout(() => {
      dispatch(props.reset('userEditRole'));
    }, 200);
  },
  enableReinitialize: true,
})(EditRole);
