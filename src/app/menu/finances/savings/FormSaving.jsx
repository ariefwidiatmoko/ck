import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, isNumeric } from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import { Profilecard } from '../../../common/components/Profilecard';
import background from '../../../../images/default-background.jpg';
import profileDefault from '../../../../images/user-default.png';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import DateInput from '../../../common/form/DateInput';

const validate = combineValidators({
  primary: isNumeric({ message: 'Masukkan angka' }),
  secondary: isNumeric({ message: 'Masukkan angka' }),
  tertier: isNumeric({ message: 'Masukkan angka' }),
});

class FormSaving extends Component {
  render() {
    const {
      handleSubmit,
      onFormSubmit,
      initialValues,
      invalid,
      loading,
      pristine,
      closeModal,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
        <section className='modal-card-body is-size-6'>
          <div className='columns'>
            <div className='column is-one-third'>
              <Profilecard
                background={background}
                profileDefault={profileDefault}
                auth={{
                  name: initialValues ? initialValues.name : '',
                  username: initialValues ? initialValues.code : '',
                }}
                profile={
                  initialValues
                    ? { ...initialValues, createdAt: initialValues.joinDate }
                    : ''
                }
                link={SITE_ADDRESS}
              />
            </div>
            <div className='column'>
              <Field
                label='Alamat'
                name='address'
                placeholder='Alamat'
                type='text'
                component={TextInput}
                fullwidth={true}
                readOnly
              />
              <Field
                label='Telepon'
                name='phone'
                placeholder='Telepon'
                type='text'
                component={TextInput}
                fullwidth={true}
                readOnly
              />
              <Field
                label='Tanggal'
                name='date'
                placeholder='YYYY/MM/DD'
                type='date'
                component={DateInput}
                showMonthDropdown
                fullwidth={true}
              />
              <Field
                label='Simpanan Pokok'
                name='primary'
                placeholder='Simpanan Pokok'
                type='text'
                autoFocus={true}
                component={TextInput}
                fullwidth={true}
              />
              <Field
                label='Simpanan Wajib'
                name='secondary'
                placeholder='Simpanan Pokok'
                type='text'
                component={TextInput}
                fullwidth={true}
              />
              <Field
                label='Simpanan Sukarela'
                name='tertier'
                placeholder='Simpanan Pokok'
                type='text'
                component={TextInput}
                fullwidth={true}
              />
            </div>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <button
            type='submit'
            disabled={invalid || loading || pristine}
            className='button is-success is-small is-rounded is-outlined'
          >
            <i className='fas fa-save icon' />
          </button>
          <button
            className='button custom-grey is-small is-rounded is-outlined'
            onClick={closeModal}
          >
            <i className='fas fa-arrow-left icon' />
          </button>
        </footer>
      </form>
    );
  }
}

export default reduxForm({ form: 'savingAdd', validate })(FormSaving);
