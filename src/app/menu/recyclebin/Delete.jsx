import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../modals/redux/modalActions';
import { recyclebinDel } from './redux/reduxApi';

const actions = {
  closeModal,
  recyclebinDel,
};

class Delete extends Component {
  onDelete = () => {
    const { data, recyclebinDel, closeModal } = this.props;
    recyclebinDel(data.item.id, data.auth, data.total);
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
          <header className='modal-card-head is-danger'>
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
              Apakah anda yakin ingin menghapus selamanya{' '}
              <span className='has-text-danger has-text-weight-semibold'>
                {`${item.name}`}
              </span>{' '}
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
