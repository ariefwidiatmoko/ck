import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { savingEdit } from './redux/reduxApi';
import FormSaving from './FormSaving';

const mapState = (state) => {
  return {
    loading: state.async.loading,
    auth: state.auth,
  };
};

const actions = {
  closeModal,
  savingEdit,
};

class EditForm extends Component {

  onFormSubmit = (values) => {
    const { auth, savingEdit } = this.props;
    const savingCode = values.savingCode;
    try {
      savingEdit(values, auth, savingCode);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { closeModal, savingEdit, data } = this.props;
    const item = data.item;
    const profile = item.profile;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-size-6'>
              <i className='fas fa-file-invoice-dollar icon mr-1' />
              {data &&
                `Edit Simpanan [${item.savingCode}`}
            </div>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <FormSaving
            initialValues={{...item, ...profile}}
            onFormSubmit={this.onFormSubmit}
            savingEdit={savingEdit}
            closeModal={closeModal}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(EditForm);
