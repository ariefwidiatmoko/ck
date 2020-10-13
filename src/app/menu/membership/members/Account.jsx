import React, { Component, Fragment } from 'react';

class Account extends Component {
  render() {
    const { member } = this.props;
    return (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <h3 className='has-text-weight-bold'>Username</h3>
            <div className='view'>
              <p>{member.code || '-'}</p>
            </div>
          </div>
          <div className='column'>
            <h3 className='has-text-weight-bold'>Default Password</h3>
            <div className='view'>
              <p>{member.name || 'belum diset'}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Account;
