import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import SelectInput from '../../../common/form/SelectInput';
import TextArea from '../../../common/form/TextArea';
import DateInput from '../../../common/form/DateInput';
import {
  activeStatus,
  gender,
  religion,
  maritalStatus,
} from '../../../common/helpers/optionHelpers';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';

const validate = combineValidators({
  code: composeValidators(
    isRequired({ message: 'No Anggota harus diisi' }),
    hasLengthGreaterThan(9)({
      message: 'No Anggota harus memiliki paling sedikit 10 karakter',
    })
  )(),
  name: composeValidators(
    isRequired({ message: 'Panggilan harus diisi' }),
    hasLengthGreaterThan(1)({
      message: 'Panggilan harus memiliki paling sedikit 2 karakter',
    })
  )(),
  joinDate: isRequired({ message: 'Tanggal bergabung harus diisi' }),
});

class CreateEdit extends Component {
  render() {
    const {
      memberId,
      toggle,
      invalid,
      loading,
      pristine,
      history,
      handleSubmit,
      onFormSubmit,
      handleToggle,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='No Anggota'
              name='code'
              placeholder='No Anggota'
              type='text'
              disabled
              component={TextInput}
            />
            <Field
              label='Tanggal Bergabung'
              name='joinDate'
              placeholder='YYYY/MM/DD'
              type='date'
              component={DateInput}
              showMonthDropdown
              showYearDropdown
              defaultSelected={new Date()}
              fullwidth={true}
            />
            {memberId && (
              <Field
                label='Status Anggota'
                name='activeStatus'
                placeholder='Status Anggota'
                type='text'
                component={SelectInput}
                options={activeStatus}
                fullwidth={true}
              />
            )}
          </div>
        </div>
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
              placeholder='YYYY/MM/DD'
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
              onChange={handleToggle}
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
          name='address'
          type='text'
          component={TextArea}
          placeholder='Alamat'
          label='Alamat'
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
              type='button'
              onClick={() => history.goBack()}
              className='button custom-grey is-small is-rounded is-outlined'
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
  form: 'memberCreateEdit',
  enableReinitialize: true,
  validate,
})(CreateEdit);
