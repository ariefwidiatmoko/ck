import React,{Component} from "react";
import {connect} from "react-redux";
import {closeModal} from './modalActions'
import {softDeletePost} from '../posts/postActions'

const actions = {
    closeModal,
    softDeletePost
}

class DeletePostModal extends Component{
  onDelete = (id, title) => {
    this.props.softDeletePost(id);
    this.props.closeModal();
  }

  render() {
    const {closeModal, id, title} = this.props;
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title is-size-5">Confirmation Deletion</p>
            <button onClick={closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p style={{marginTop: 16}}>
              Are you sure you want to delete <span className="has-text-weight-semibold">{`"${title}"`}</span>
            </p>
            <p className="has-text-danger is-italic is-size-7" style={{marginBottom: 16}}>( Note: Deleted data cannot be restore )</p>
          </section>
          <footer className="modal-card-foot">
            <button onClick={() => this.onDelete(id)} className="button is-danger is-small is-rounded is-outlined">Delete</button>
            <button className="button custom-grey is-small is-rounded is-outlined" onClick={closeModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
};

export default connect(null, actions)(DeletePostModal);
