import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from './redux/modalActions';

const actions = {
  closeModal,
};

const ActivationModal = ({ closeModal, username, code }) => {
  return (
    <div className='modal is-active'>
      <div className='modal-background' onClick={closeModal}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Account Activation</p>
          <button
            onClick={closeModal}
            className='delete'
            aria-label='close'
          ></button>
        </header>
        <section className='modal-card-body'>
          <form>
            <div className='field'>
              <label className='label'>Username</label>
              <div className='control has-icons-right'>
                <input
                  name='username'
                  className='input is-small'
                  type='text'
                  placeholder='Username'
                  defaultValue={username}
                />
                <span className='icon is-small is-right'>
                  <i className='fas fa-copy'></i>
                </span>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Activation Code</label>
              <div className='control has-icons-right'>
                <input
                  name='code'
                  readOnly
                  className='input is-small'
                  type='text'
                  placeholder='Activation Code'
                  defaultValue={code}
                />
                <span className='icon is-small is-right'>
                  <i className='fas fa-copy'></i>
                </span>
              </div>
            </div>
          </form>
        </section>
        <footer className='modal-card-foot'>
          <button className='button is-small is-link is-rounded is-outlined'>
            Save
          </button>
          <button
            className='button is-small custom-grey is-rounded is-outlined'
            onClick={closeModal}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, actions)(ActivationModal);
