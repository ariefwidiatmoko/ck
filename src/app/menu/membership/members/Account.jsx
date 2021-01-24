import React from 'react';

export default function Account(props) {
  const { member } = props;
  return (
    <>
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
    </>
  )
}

