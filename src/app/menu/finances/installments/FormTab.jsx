import React from 'react';

export default function FormTab(props) {
  const { id, onChangeActiveTab, activeTab } = props;
  return (
    <div className='tabs'>
      <ul>
        <li
          onClick={() => onChangeActiveTab('basic')}
          className={activeTab === 'basic' ? 'is-active' : ''}
        >
          <div to={`/keuangan/angsuran/${id}`}>
            <span className='icon is-small'>
              <i className='fas fa-id-card-alt' aria-hidden='true'></i>
            </span>
            Angsuran
          </div>
        </li>
      </ul>
    </div>
  )
}

