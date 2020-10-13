import React, { Component } from 'react';
import { withRouter } from 'react-router';

class NotAuthorizedModal extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className='modal is-active'>
        <div
          className='modal-background'
          style={{ backgroundColor: 'black', opacity: 1 }}
        ></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title has-text-danger'>
              <i className='fas fa-lock icon'></i> Tidak Memiliki otoritas
            </p>
          </header>
          <section className='modal-card-body'>
            <div>
              <br />
              <p className='has-text-centered'>Anda tidak memiliki otoritas!</p>
              <p className='has-text-centered' style={{ marginTop: 15 }}>
                <button
                  className='button is-rounded is-primary is-outlined'
                  onClick={() => history.goBack()}
                >
                  Kembali
                </button>
              </p>
              <br />
            </div>
          </section>
          <footer className='modal-card-foot'></footer>
        </div>
      </div>
    );
  }
}

export default withRouter(NotAuthorizedModal);
