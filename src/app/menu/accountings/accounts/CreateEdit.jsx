import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import {
  levels,
  headerDetails,
  types,
} from '../../../common/helpers/optionHelpers';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  hasLengthBetween,
} from 'revalidate';
import RadioInput from '../../../common/form/RadioInput';

const validate = combineValidators({
  code: composeValidators(
    isRequired({ message: 'Kode harus diisi' }),
    hasLengthBetween(
      5,
      7
    )({
      message: 'Kode harus memiliki 6 karakter',
    })
  )(),
  name: composeValidators(
    isRequired({ message: 'Akun harus diisi' }),
    hasLengthGreaterThan(2)({
      message: 'Akun harus memiliki paling sedikit 3 karakter',
    })
  )(),
  headerDetail: isRequired({ message: 'Header/Detail harus diisi' }),
  level: isRequired({ message: 'level harus diisi' }),
});

class CreateEdit extends Component {
  state = {
    headerDetail: this.props.initialValues.headerDetail,
    level: this.props.initialValues.level,
    type: this.props.initialValues.type,
  };

  handleSelect = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      invalid,
      loading,
      pristine,
      closeModal,
      handleSubmit,
      onFormSubmit,
    } = this.props;
    const { type, level, headerDetail } = this.state;
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
        <section className='modal-card-body is-size-6'>
          <div className='field is-horizontal'>
            <div className='field-body'>
              <Field
                label='Kode'
                name='code'
                placeholder='Kode'
                type='text'
                component={TextInput}
                fullwidth={true}
              />
              <Field
                label='Akun'
                name='name'
                placeholder='Nama Akun'
                type='text'
                component={TextInput}
                fullwidth={true}
              />
            </div>
          </div>
          <Field
            label='Tipe'
            name='type'
            placeholder='Level'
            type='radio'
            selectedVal={type}
            component={RadioInput}
            options={types}
            onChange={this.handleSelect}
          />
          <Field
            label='Header/Detail'
            name='headerDetail'
            placeholder='Header/Detail'
            type='radio'
            selectedVal={headerDetail}
            component={RadioInput}
            options={headerDetails}
            onChange={this.handleSelect}
          />
          <Field
            label='Level'
            name='level'
            placeholder='Level'
            type='radio'
            selectedVal={level}
            component={RadioInput}
            options={levels}
            onChange={this.handleSelect}
          />
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
            onClick={() => window.location.reload()}
          >
            <i className='fas fa-redo icon' />
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

export default reduxForm({ form: 'accountForm', validate })(CreateEdit);
