import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { accountAdd, accountEdit } from './redux/reduxApi';
import CreateEdit from './CreateEdit';

const mapState = (state) => {
  return {
    account: '',
    initialValues: '',
    loading: state.async.loading,
    auth: state.auth,
  };
};

const actions = {
  closeModal,
  accountAdd,
  accountEdit,
};

class Form extends Component {
  onFormSubmit = async (values) => {
    const { auth, accountAdd, accountEdit } = this.props;
    if (!values.id) {
      try {
        await accountAdd(values, auth);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await accountEdit(values, auth, values.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { data, closeModal } = this.props;
    const item = data.item;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-success'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-capitalized is-size-6'>
              <i
                className={`fas fa-${item.id !== null ? 'pen' : 'plus'} icon`}
              />{' '}
              {item.id !== null
                ? `Edit [ ${item.code} - ${item.name} ]`
                : 'Tambah Akun'}
            </div>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <CreateEdit
            initialValues={item}
            closeModal={closeModal}
            onFormSubmit={this.onFormSubmit}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Form);
