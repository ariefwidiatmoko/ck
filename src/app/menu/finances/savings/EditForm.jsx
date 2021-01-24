import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { savingEdit } from './redux/reduxApi';
import FormSaving from './FormSaving';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

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
  onCreateJournal = () => {
    const { history, data, closeModal } = this.props;
    history.push('/akuntansi/jurnal/tambah/savings_' + data.item.code);
    closeModal();
  };
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
              {data && `Edit Simpanan [${item.code}]`}
            </div>
            <button
              onClick={this.onCreateJournal}
              className='button is-link is-small is-rounded is-outlined'
            >
              Buat Jurnal
            </button>
          </header>
          <FormSaving
            initialValues={{ ...item, ...profile }}
            onFormSubmit={this.onFormSubmit}
            savingEdit={savingEdit}
            closeModal={closeModal}
          />
        </div>
      </div>
    );
  }
}

export default compose(withRouter, connect(mapState, actions))(EditForm);
