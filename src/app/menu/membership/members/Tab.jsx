import React from 'react';

export default function Tab(props) {
  const { memberId, onChangeActiveTab, activeTab } = props;
  return (
    <div className='tabs'>
      <ul>
        <li
          onClick={() => onChangeActiveTab('basic')}
          className={activeTab === 'basic' ? 'is-active' : ''}
        >
          <div to={`/keanggotaan/anggota/edit/${memberId}`}>
            <span className='icon is-small'>
              <i className='fas fa-id-card-alt' aria-hidden='true'></i>
            </span>
            Info
          </div>
        </li>
        <li
          onClick={() => onChangeActiveTab('photo')}
          className={activeTab === 'photo' ? 'is-active' : ''}
        >
          <div to={`/keanggotaan/anggota/edit/${memberId}`}>
            <span className='icon is-small'>
              <i className='fas fa-image' aria-hidden='true'></i>
            </span>
            Foto
          </div>
        </li>
        <li
          onClick={() => onChangeActiveTab('account')}
          className={activeTab === 'account' ? 'is-active' : ''}
        >
          <div to={`/keanggotaan/anggota/edit/${memberId}`}>
            <span className='icon is-small'>
              <i className='fas fa-user-cog' aria-hidden='true'></i>
            </span>
            Akun
          </div>
        </li>
      </ul>
    </div>
  )
}

