import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userDel } from '../users-management/Users/redux/reduxApi';
import { closeModal } from './redux/modalActions';

const actions = {
  closeModal,
  userDel,
};

class AdvanceSearch extends Component {
  onDelete = (id, auth) => {
    this.props.userDel(id, auth);
    this.props.closeModal();
  };

  render() {
    const { closeModal } = this.props;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title is-size-5'>Pencarian+</p>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <section className='modal-card-body'>
            <p style={{ marginTop: 16 }}>Pencarian lanjut tidak tersedia</p>
            <br />
          </section>
          <footer className='modal-card-foot'>
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

export default connect(null, actions)(AdvanceSearch);
