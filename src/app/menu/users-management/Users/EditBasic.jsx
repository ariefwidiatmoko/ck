import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import SelectInput from '../../../common/form/SelectInput';
import TextArea from '../../../common/form/TextArea';
import MultiSelectInput from '../../../common/form/MultiSelectInput';
import DateInput from '../../../common/form/DateInput';
import {
  gender,
  religion,
  maritalStatus,
  hobbies,
} from '../../../common/helpers/optionHelpers';
import { Button } from '../../../common/components/Button';

const validate = combineValidators({
  displayName: isRequired({ message: 'Display Name is required' }),
});

class EditBasic extends Component {
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
      onFormSubmit,
      handleSubmit,
      invalid,
      submitting,
      pristine,
      history,
      toggle,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Panggilan'
              name='name'
              type='text'
              component={TextInput}
              placeholder='Panggilan'
              className='is-expanded'
            />
            <Field
              label='Nama Lengkap'
              name='fullname'
              type='text'
              component={TextInput}
              placeholder='Nama Lengkap'
              className='is-expanded'
            />
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              name='phone'
              type='text'
              component={TextInput}
              placeholder='Nomer Telepon'
              label='Nomer Telepon'
            />
            <Field
              label='Jenis Kelamin'
              name='gender'
              type='text'
              component={SelectInput}
              placeholder='Jenis Kelamin'
              options={gender}
              fullwidth={true}
            />
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Tempat Lahir'
              name='pob'
              type='text'
              component={TextInput}
              placeholder='Tempat Lahir'
              className='is-expanded'
            />
            <Field
              label='Tanggal Lahir'
              name='dob'
              type='date'
              component={DateInput}
              placeholder='Pilih Tanggal'
              showMonthDropdown
              showYearDropdown
              defaultSelected={null}
              fullwidth={true}
            />
          </div>
        </div>
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
              fullwidth={toggle === true ? true : false}
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
        <Field
          name='address'
          type='text'
          component={TextArea}
          placeholder='Alamat'
          label='Alamat'
        />
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Status Kawin'
              name='maritalStatus'
              type='text'
              component={SelectInput}
              placeholder='Status Kawin'
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
  form: 'userEditBasic',
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.reset('userEditBasic'));
    props.updateInitialValues();
  },
  validate,
  enableReinitialize: true,
})(EditBasic);
