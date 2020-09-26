import React from "react";
import {connect} from "react-redux";
import {closeModal} from './redux/modalActions'

const actions = {
    closeModal
}

const TestModal = ({closeModal, data}) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Title</p>
          <button onClick={closeModal} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p>
            Test Modal... Nothing to see here {data}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save</button>
          <button className="button" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default connect(null, actions)(TestModal);
