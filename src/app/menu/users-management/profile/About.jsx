import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SelectInput from '../../../common/form/SelectInput';
import TextArea from '../../../common/form/TextArea';
import MultiSelectInput from '../../../common/form/MultiSelectInput';
import TextInput from '../../../common/form/TextInput';
import {
  religion,
  maritalStatus,
  hobbies,
} from '../../../common/helpers/optionHelpers';
import { Button } from '../../../common/components/Button';

class About extends Component {
  componentDidMount = () => {
    this.props.handleToggle();
  };

  onChange = (e) => {
    if (e.target.value === 'Other') {
      this.props.handleToggle(true);
    } else {
      this.props.handleToggle(false);
    }
  };

  render() {
    const {
      pristine,
      updateProfile,
      handleSubmit,
      loading,
      toggle,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(updateProfile)} autoComplete='off'>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Agama'
              name='religion'
              type='text'
              component={SelectInput}
              placeholder='Pilih Agama'
              options={religion}
              onChange={this.onChange}
              fullwidth={true}
            />
            {toggle === true && (
              <Field
                label='Detail'
                name='religionDetail'
                type='text'
                component={TextInput}
                placeholder='Detail'
              />
            )}
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Status Kawin'
              name='maritalStatus'
              type='text'
              component={SelectInput}
              options={maritalStatus}
              fullwidth={true}
            />
            <Field
              label='Pekerjaan'
              name='occupation'
              type='text'
              component={TextInput}
              placeholder='Pekerjaan'
            />
          </div>
        </div>
        <Field
          label='Hobi'
          name='arrHobbies'
          placeholder='Pilih Hobi'
          component={MultiSelectInput}
          data={hobbies}
        />
        <Field
          name='about'
          type='text'
          component={TextArea}
          placeholder='Ceritakan tentang Anda'
          label='Tentang'
        />
        <div
          className='field is-grouped'
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <div className='control'>
            <Button
              type='submit'
              disabled={loading || pristine}
              className='button is-primary is-small is-rounded is-outlined'
              loading={loading}
              label='Simpan'
            />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'profileAbout',
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.reset('profileAbout'));
    props.updateInitialValues();
    props.handleToggle();
  },
  enableReinitialize: true,
})(About);
