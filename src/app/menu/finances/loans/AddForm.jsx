import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { combineValidators, composeValidators, isNumeric, isRequired } from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import DateInput from '../../../common/form/DateInput';
import { connect } from 'react-redux';
import { numFormatted } from '../../../common/helpers/othersHelpers';

const validate = combineValidators({
  loanSum: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({message: 'Jumlah pinjaman harus diisi'})
    )(),
  month: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({message: 'Tenor pinjaman harus diisi'})
    )(),
  interest: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({message: 'Bunga harus diisi'})
    )(),
  loanSaving: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({message: 'Simpanan wajib harus diisi'})
    )(),
  adm: isNumeric({ message: 'Masukkan angka' }),
  crk: isNumeric({ message: 'Masukkan angka' }),
  others: isNumeric({ message: 'Masukkan angka' }),
});

let AddForm = (props) => {
  const {
    handleSubmit,
    onFormSubmit,
    initialValues,
    invalid,
    loading,
    pristine,
    closeModal,
    countInstallment,
    loanSum,
    month,
    interest,
    adm,
    crk,
    others,
    loanSaving,
  } = props;
  const values = countInstallment(
    loanSum || 0,
    month,
    interest,
    adm || 0,
    crk || 0,
    others || 0,
    loanSaving || 0
  );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
      <section className='modal-card-body is-size-6'>
        <div className='columns'>
          <div className='column is-half'>
            <h3 className='has-text-weight-bold'>Alamat</h3>
            <div className='view'>
              <p>{initialValues.address}</p>
            </div>
          </div>
          <div className='column is-half'>
            <h3 className='has-text-weight-bold'>Telpon</h3>
            <div className='view'>
              <p>{initialValues.phone}</p>
            </div>
          </div>
        </div>
        <div className='columns'>
          <div className='column'>
            <div className='field is-horizontal'>
              <div className='field-body'>
                <Field
                  label='Tanggal Pinjam'
                  name='date'
                  placeholder='YYYY/MM/DD'
                  type='date'
                  component={DateInput}
                  showMonthDropdown
                  fullwidth={true}
                />
                <Field
                  label='Bunga (%)'
                  name='interest'
                  placeholder='Bunga Pinjaman'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
              </div>
            </div>
            <div className='field is-horizontal'>
              <div className='field-body'>
                <Field
                  label='Jumlah'
                  name='loanSum'
                  placeholder='Jumlah Pinjaman'
                  type='text'
                  autoFocus={true}
                  component={TextInput}
                  fullwidth={true}
                />
                <Field
                  label='Tenor'
                  name='month'
                  placeholder='Tenor dalam Bulan'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
                <Field
                  label='Simpanan Wajib'
                  name='loanSaving'
                  placeholder='Simpanan Wajib Pinjam'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
              </div>
            </div>
            <div className='field is-horizontal'>
              <div className='field-body'>
                <Field
                  label='ADM'
                  name='adm'
                  placeholder='ADM'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
                <Field
                  label='CRK'
                  name='crk'
                  placeholder='CRK'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
                <Field
                  label='Lain-lain'
                  name='others'
                  placeholder='Lain-lain'
                  type='text'
                  component={TextInput}
                  fullwidth={true}
                />
              </div>
            </div>
            <div className='columns'>
              <div className='column is-one-third'>
                <h3 className='has-text-weight-bold'>Jumlah Total</h3>
                <div className='view'>
                  <p>
                    {values && values.sumTotal
                      ? 'Rp' + numFormatted(values.sumTotal)
                      : '-'}
                  </p>
                </div>
              </div>
              <div className='column is-one-third'>
                <h3 className='has-text-weight-bold'>Angsuran</h3>
                <div className='view'>
                  <p>
                    {values && values.installment
                      ? 'Rp' + numFormatted(values.installment)
                      : '-'}
                  </p>
                </div>
              </div>
              <div className='column'>
                <h3 className='has-text-weight-bold'>Pembulatan</h3>
                <div className='view'>
                  <p>
                    {values && values.installmentFix
                      ? 'Rp' + numFormatted(values.installmentFix)
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
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
};

AddForm = reduxForm({
  form: 'loanForm',
  validate,
})(AddForm);

const selector = formValueSelector('loanForm');
AddForm = connect((state) => {
  const { loanSum, month, interest, adm, crk, others, loanSaving } = selector(
    state,
    'loanSum',
    'month',
    'interest',
    'adm',
    'crk',
    'others',
    'loanSaving'
  );
  return { loanSum, month, interest, adm, crk, others, loanSaving };
})(AddForm);

export default AddForm;
