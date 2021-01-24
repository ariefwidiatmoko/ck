import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { loanEdit } from './redux/reduxApi';
import EditForm from './EditForm';

const mapState = (state) => {
  return {
    loading: state.async.loading,
    auth: state.auth,
  };
};

const actions = {
  closeModal,
  loanEdit,
};

class Edit extends Component {

  onFormSubmit = (values) => {
    const { auth, loanEdit } = this.props;
    const loanCode = values.loanCode;
    try {
      loanEdit(values, auth, loanCode);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { closeModal, loanEdit, data } = this.props;
    const item = data.item;
    const profile = item.profile;
    const fees = JSON.parse(item.fees);
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-size-6'>
              <i className='fas fa-file-invoice-dollar icon mr-1' />
              {data &&
                `Edit Pinjaman [${item.loanCode}`}
            </div>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <EditForm
            initialValues={{...item, ...profile, ...fees}}
            onFormSubmit={this.onFormSubmit}
            loanEdit={loanEdit}
            closeModal={closeModal}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Edit);
