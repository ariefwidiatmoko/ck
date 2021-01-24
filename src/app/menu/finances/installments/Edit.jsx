import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { installmentEdit } from './redux/reduxApi';
import EditForm from './EditForm';

const mapState = (state) => {
  return {
    loading: state.async.loading,
    auth: state.auth,
  };
};

const actions = {
  closeModal,
  installmentEdit,
};

class Edit extends Component {
  onFormSubmit = (values) => {
    console.log(values);
    // const { auth, installmentEdit } = this.props;
    // const installmentCode = values.installmentCode;
    // try {
    //   installmentEdit(values, auth, installmentCode);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  render() {
    const { closeModal, installmentEdit, data, loading } = this.props;
    const item = data.item;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-size-6'>
              <i className='fas fa-file-invoice-dollar icon mr-1' />
              {data && `Edit Angsuran [${item.installmentCode}`}
            </div>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <EditForm
            initialValues={item}
            onFormSubmit={this.onFormSubmit}
            installmentEdit={installmentEdit}
            closeModal={closeModal}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Edit);
