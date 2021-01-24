import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, submit, formValueSelector } from 'redux-form';
import { combineValidators, composeValidators, isRequired, isNumeric } from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import DateInput from '../../../common/form/DateInput';
import SelectInput from '../../../common/form/SelectInput';
import { numFormatted } from '../../../common/helpers/othersHelpers';

const validate = combineValidators({
  accountCode: composeValidators(
    isRequired({message: 'kode harus diisi'})
    )(),
  date: isRequired({message: 'Tanggal harus diisi'}),
  receptionSum: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({message: 'Jumlah penerimaan harus diisi'})
    )(),
  receptionUnit: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({message: 'Unit harus diisi'})
    )(),
});

let AddForm = (props) => {
  const {
    handleSubmit,
    onFormSubmit,
    invalid,
    loading,
    pristine,
    closeModal,
    accounts,
    receptionSum,
    receptionUnit,
  } = props;
  let total =
    receptionSum && receptionUnit
      ? Number(receptionSum) * Number(receptionUnit)
      : '-';
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
      <section className='modal-card-body is-size-6'>
        <div className='columns'>
          <div className='column'>
            <div className='field is-horizontal'>
              <div className='field-body'>
                <Field
                  label='Kode Penerimaan*'
                  name='accountCode'
                  type='text'
                  component={SelectInput}
                  placeholder='Kode Penerimaan'
                  options={accounts}
                  fullwidth={true}
                />
                <Field
                  label='Tanggal*'
                  name='date'
                  placeholder='YYYY/MM/DD'
                  type='date'
                  component={DateInput}
                  showMonthDropdown
                  fullwidth={true}
                />
              </div>
            </div>
            <div className='field is-horizontal'>
              <div className='field-body'>
                <Field
                  label='Nama Penerimaan'
                  name='receptionName'
                  placeholder='Nama Penerimaan'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
                <Field
                  label='Jenis Penerimaan'
                  name='receptionType'
                  placeholder='Jenis Penerimaan'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
              </div>
            </div>
            <div className='field is-horizontal'>
              <div className='field-body'>
                <Field
                  label='Jumlah*'
                  name='receptionSum'
                  placeholder='Jumlah Penerimaan'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
                <Field
                  label='Satuan*'
                  name='receptionUnit'
                  placeholder='Satuan'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
              </div>
            </div>
            <div className='columns mt-2'>
              <div className='column'>
                <h3 className='has-text-weight-bold'>Total</h3>
                <div className='view'>
                  <p>
                    {total > 0
                      ? 'Rp' + numFormatted(total)
                      : '-'}</p>
                </div>
              </div>
            </div>
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
};

AddForm = reduxForm({
  form: 'receptionAdd',
  validate,
  onSubmit: submit,
})(AddForm);

const selector = formValueSelector('receptionAdd');
AddForm = connect((state) => {
  const { receptionSum, receptionUnit } = selector(
    state,
    'receptionSum',
    'receptionUnit'
  );
  return { receptionSum, receptionUnit };
})(AddForm);

export default AddForm;
