import React from 'react';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import DateInput from '../../../common/form/DateInput';

function Info(props) {
  const { handleSubmit, updateProfile } = props;
  return (
    <form autoComplete='off' onSubmit={handleSubmit(updateProfile)}>
      <div className='field is-horizontal'>
        <div className='field-body'>
          <Field
            label='Username'
            name='username'
            type='text'
            component={TextInput}
            placeholder='Username'
            readOnly={true}
            fullwidth={true}
          />
          <Field
            label='Kode'
            name='code'
            type='text'
            component={TextInput}
            placeholder='Kode'
            readOnly={true}
            fullwidth={true}
          />
          <Field
            label='Dibuat'
            name='joinDate'
            type='date'
            component={DateInput}
            placeholder='Dibuat'
            readOnly={true}
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
            label='Panggilan'
            name='name'
            type='text'
            readOnly={true}
            component={TextInput}
            placeholder='Panggilan'
            className='is-expanded'
          />
          <Field
            label='Nama Lengkap'
            name='fullname'
            type='text'
            readOnly={true}
            component={TextInput}
            placeholder='Nama Lengkap'
            className='is-expanded'
          />
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-body'>
          <Field
            label='Tempat Lahir'
            name='pob'
            type='text'
            readOnly={true}
            component={TextInput}
            placeholder='Tempat Lahir'
            fullwidth={true}
          />
          <Field
            label='Tanggal Lahir'
            name='dob'
            type='date'
            readOnly={true}
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
            label='Jenis Kelamin'
            name='gender'
            type='text'
            readOnly={true}
            component={TextInput}
            fullwidth={true}
          />
          <Field
            label='Nomer Telepon'
            name='phone'
            type='tel'
            readOnly={true}
            component={TextInput}
            placeholder='Nomer Telepon'
          />
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-body'>
          <Field
            label='Email'
            name='email'
            type='text'
            readOnly={true}
            component={TextInput}
            placeholder='Email'
          />
          <Field
            label='Alamat'
            name='address'
            type='text'
            readOnly={true}
            component={TextInput}
            placeholder='Alamat'
          />
        </div>
      </div>
      <br />
    </form>
  );
}

export default reduxForm({
  form: 'profileInfo',
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.reset('profileInfo'));
    props.updateInitialValues();
  },
  enableReinitialize: true,
})(Info);
