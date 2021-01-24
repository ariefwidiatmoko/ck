import React from 'react';

export default function ViewAccount(props) {
  const { user } = props;
  return (
    <>
      <div className='columns'>
        <div className='column is-full'>
          <h3 className='has-text-weight-bold'>Username</h3>
          <div className='view'>
            <p>{user.username || '-'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

