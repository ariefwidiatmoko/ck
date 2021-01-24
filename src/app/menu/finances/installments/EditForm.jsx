import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import DateInput from '../../../common/form/DateInput';
import {
  combineValidators,
  isRequired,
  composeValidators,
  isNumeric,
} from 'revalidate';

const validate = combineValidators({
  installmentSum: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({ message: 'Angsuran yang dibayarkan perlu diisi!' })
  )(),
});

function EditForm(props) {
  const {
    closeModal,
    onFormSubmit,
    handleSubmit,
    invalid,
    loading,
    pristine,
  } = props;
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
      <section className='modal-card-body is-size-6'>
        <div className='columns'>
          <div className='column mt-1 mb-5'>
            <Field
              label='Tanggal Pembayaran'
              name='date'
              placeholder='YYYY/MM/DD'
              type='date'
              component={DateInput}
              showMonthDropdown
              fullwidth={true}
            />
            <Field
              label='Angsuran'
              name='installmentSum'
              placeholder='Angsuran'
              type='text'
              component={TextInput}
              fullwidth={true}
              autoFocus={true}
            />
            <Field
              label='Keterangan'
              name='remarks'
              placeholder='Keterangan'
              type='text'
              component={TextInput}
              fullwidth={true}
            />
          </div>
        </div>
      </section>
      <footer className='modal-card-foot py-3'>
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

export default reduxForm({
  form: 'installmentEdit',
  validate,
  enableReinitialize: true,
})(EditForm);
