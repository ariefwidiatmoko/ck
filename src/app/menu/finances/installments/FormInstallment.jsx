import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  combineValidators,
  isRequired,
  composeValidators,
  isNumeric,
} from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import DateInput from '../../../common/form/DateInput';
import { Button } from '../../../common/components/Button';

const validate = combineValidators({
  installmentSum: composeValidators(
    isNumeric({ message: 'Masukkan angka' }),
    isRequired({ message: 'Angsuran yang dibayarkan perlu diisi!' })
  )(),
});

class FormInstallment extends Component {
  render() {
    const {
      onFormSubmit,
      handleSubmit,
      invalid,
      submitting,
      history,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Pinjaman Pokok'
              name='loanSum'
              type='text'
              component={TextInput}
              placeholder='Pinjaman Pokok'
              className='is-expanded'
              readOnly={true}
            />
            <Field
              label='Jumlah Total'
              name='sumTotal'
              type='text'
              component={TextInput}
              placeholder='Jumlah Total'
              className='is-expanded'
              readOnly={true}
            />
            <Field
              label='Tenor (bulan)'
              name='month'
              type='text'
              component={TextInput}
              placeholder='Tenor (bulan)'
              className='is-expanded'
              readOnly={true}
            />
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Telah Dibayarkan'
              name='loanPaid'
              type='text'
              component={TextInput}
              placeholder='Telah dibayarkan'
              className='is-expanded'
              fullwidth={true}
              readOnly={true}
            />
            <Field
              label='Sisa Pinjaman'
              name='loanLeft'
              type='text'
              component={TextInput}
              placeholder='Sisa Pinjaman'
              className='is-expanded'
              fullwidth={true}
              readOnly={true}
            />
            <Field
              label='Tanggal Peminjaman'
              name='date'
              placeholder='YYYY/MM/DD'
              type='date'
              component={DateInput}
              showMonthDropdown
              fullwidth={true}
              readOnly={true}
            />
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <Field
              label='Angsuran yang dibayar'
              name='installmentSum'
              type='text'
              component={TextInput}
              placeholder='Angsuran yang dibayarkan'
              className='is-expanded'
              fullwidth={true}
              autoFocus={true}
            />
            <Field
              label='Keterangan'
              name='installmentRemarks'
              type='text'
              component={TextInput}
              placeholder='Keterangan'
              className='is-expanded'
              fullwidth={true}
            />
            <Field
              label='Tanggal Pembayaran'
              name='installmentDate'
              placeholder='YYYY/MM/DD'
              type='date'
              component={DateInput}
              showMonthDropdown
              fullwidth={true}
            />
          </div>
        </div>
        <div className='field is-grouped mt-5 my-3'>
          <div className='control'>
            <Button
              type='submit'
              disabled={invalid || submitting}
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
  form: 'installmentForm',
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.reset('installmentForm'));
  },
  validate,
  enableReinitialize: true,
})(FormInstallment);
