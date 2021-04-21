import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { supervisorRemove } from './redux/reduxApi';

const actions = {
  closeModal,
  supervisorRemove,
};

class Unset extends Component {
  onUnset = () => {
    const { data, supervisorRemove, closeModal } = this.props;
    supervisorRemove(data.auth, data.item.code, data.total);
    data.itnRed();
    closeModal();
  };

  render() {
    const { data, closeModal } = this.props;
    console.log(data);
    const item = data.item;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger'>
            <div className='modal-card-title has-text-danger has-text-weight-normal'>
              <i className='fas fa-tasks icon' /> Set Anggota
            </div>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <section className='modal-card-body is-size-6'>
            <p className='my-3 mx-1'>
              Apakah anda yakin ingin set{' '}
              <span className='has-text-danger has-text-weight-semibold'>
                {`${item.code} - ${item.name}`}
              </span>{' '}
              menjadi anggota?
            </p>
          </section>
          <footer className='modal-card-foot'>
            <button
              onClick={() => this.onUnset()}
              className='button is-danger is-small is-rounded is-outlined'
            >
              <i className='fas fa-check icon' />
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

export default connect(null, actions)(Unset);
