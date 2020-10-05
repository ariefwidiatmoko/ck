import React, { Component, Fragment } from 'react';

class ViewAccount extends Component {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <div className='columns'>
          <div className='column is-full'>
            <h3 className='has-text-weight-bold'>Username</h3>
            <div className='view'>
              <p>{user.username || '-'}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ViewAccount;
