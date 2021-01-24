import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isNumeric } from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import { Profilecard } from '../../../common/components/Profilecard';
import background from '../../../../images/default-background.jpg';
import profileDefault from '../../../../images/user-default.png';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import DateInput from '../../../common/form/DateInput';

const validate = combineValidators({
  loanSum: isNumeric({ message: 'Masukkan angka' }),
  month: isNumeric({ message: 'Masukkan angka' }),
  interest: isNumeric({ message: 'Masukkan angka' }),
  loanSaving: isNumeric({ message: 'Masukkan angka' }),
  adm: isNumeric({ message: 'Masukkan angka' }),
  crk: isNumeric({ message: 'Masukkan angka' }),
  others: isNumeric({ message: 'Masukkan angka' }),
  sumTotal: isNumeric({ message: 'Masukkan angka' }),
  installment: isNumeric({ message: 'Masukkan angka' }),
  installmentFix: isNumeric({ message: 'Masukkan angka' }),
});

class EditForm extends Component {
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
            <div className='column is-one-quarter'>
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
              <div className='field is-horizontal'>
                <div className='field-body'>
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
                </div>
              </div>
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
              <div className='field is-horizontal'>
                <div className='field-body'>
                  <Field
                    label='Jumlah Total'
                    name='sumTotal'
                    placeholder='Jumlah Total'
                    type='text'
                    component={TextInput}
                    fullwidth={true}
                  />
                  <Field
                    label='Angsuran'
                    name='installment'
                    placeholder='Angsuran'
                    type='text'
                    component={TextInput}
                    fullwidth={true}
                  />
                  <Field
                    label='Pembulatan'
                    name='installmentFix'
                    placeholder='Pembulatan'
                    type='text'
                    component={TextInput}
                    fullwidth={true}
                  />
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
  }
}

export default reduxForm({ form: 'loanEdit', validate })(EditForm);
