import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Tab extends Component {
  render() {
    const { pathname } = this.props;
    return (
      <div className='tabs'>
        <ul>
          <li
            className={
              pathname === `/pengaturan-user/profil/info` ? 'is-active' : ''
            }
          >
            <Link to={`/pengaturan-user/profil/info`}>
              <span className='icon is-small'>
                <i className='fas fa-id-card-alt' aria-hidden='true'></i>
              </span>
              Info
            </Link>
          </li>
          <li
            className={
              pathname === `/pengaturan-user/profil/tentang` ? 'is-active' : ''
            }
          >
            <Link to={`/pengaturan-user/profil/tentang`}>
              <span className='icon is-small'>
                <i className='fas fa-tasks' aria-hidden='true'></i>
              </span>
              Tentang
            </Link>
          </li>
          <li
            className={
              pathname === `/pengaturan-user/profil/foto` ? 'is-active' : ''
            }
          >
            <Link to={`/pengaturan-user/profil/foto`}>
              <span className='icon is-small'>
                <i className='fas fa-image' aria-hidden='true'></i>
              </span>
              Foto
            </Link>
          </li>
          <li
            className={
              pathname === `/pengaturan-user/profil/akun` ? 'is-active' : ''
            }
          >
            <Link to={`/pengaturan-user/profil/akun`}>
              <span className='icon is-small'>
                <i className='fas fa-user-edit' aria-hidden='true'></i>
              </span>
              Akun
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
