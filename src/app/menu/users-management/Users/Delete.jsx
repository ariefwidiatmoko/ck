import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userDel } from './redux/reduxApi';
import { closeModal } from '../../modals/redux/modalActions';

const actions = {
  closeModal,
  userDel,
};

class Delete extends Component {
  onDelete = () => {
    const { data, userDel, closeModal } = this.props;
    userDel(data.item.id, data.auth, data.total);
    data.itnRed();
    closeModal();
  };

  render() {
    const { data, closeModal } = this.props;
    const item = data.item;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <div className='modal-card-title has-text-danger has-text-weight-normal'>
              <i className='fas fa-shield-alt icon' /> Konfirmasi Hapus
            </div>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <section className='modal-card-body is-size-6'>
            <p className='my-3 mx-1'>
              Apakah anda yakin ingin menghapus{' '}
              <span className='has-text-danger has-text-weight-semibold'>{`${item.username}`}</span>{' '}
              ?
            </p>
          </section>
          <footer className='modal-card-foot'>
            <button
              onClick={() => this.onDelete()}
              className='button is-danger is-small is-rounded is-outlined'
            >
              <i className='fas fa-trash-alt icon' />
            </button>
            <button
              className='button custom-grey is-small is-rounded is-outlined'
              onClick={closeModal}
            >
              <i className='fas fa-arrow-left icon' />
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Delete);
