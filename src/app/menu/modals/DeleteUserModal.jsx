import React, { Component } from "react";
import { connect } from "react-redux";
import { userDel } from "../users-management/Users/redux/reduxApi";
import { closeModal } from "./redux/modalActions";

const actions = {
  closeModal,
  userDel,
};

class DeleteUserModal extends Component {
  onDelete = (id, auth) => {
    this.props.userDel(id, auth);
    this.props.closeModal();
  };

  render() {
    const { id, username, auth } = this.props;
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.props.closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title is-size-5">Konfirmasi Hapus</p>
            <button
              onClick={this.props.closeModal}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <p style={{ marginTop: 16 }}>
              Apakah anda yakin ingin menghapus{" "}
              <span className="has-text-weight-semibold">{`"${username}"`}</span>
            </p>
            <br />
          </section>
          <footer className="modal-card-foot">
            <button
              onClick={() => this.onDelete(id, auth)}
              className="button is-danger is-small is-rounded is-outlined"
            >
              Hapus
            </button>
            <button
              className="button custom-grey is-small is-rounded is-outlined"
              onClick={this.props.closeModal}
            >
              Batalkan
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(DeleteUserModal);
