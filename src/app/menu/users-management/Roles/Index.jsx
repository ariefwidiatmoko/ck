import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { rolesFetch } from './redux/rolesApi';
import LoadingButton from '../../../main/LoadingButton';
import Lists from './Lists/Lists';

const mapState = (state) => {
  let aS = {};
  if (state.auth) {
    aS = state.auth.arrAuth.detail.subm.filter((i) => i.id === 'role')[0];
  }
  return {
    auth: state.auth,
    aS: aS,
    roles: state.roles,
    loading: state.async.loading,
  };
};

const actions = {
  rolesFetch,
};

class Index extends Component {
  componentDidMount = () => {
    this.props.rolesFetch(this.props.auth.token);
  };

  render() {
    const { roles, loading, auth, aS } = this.props;
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable'>
            <div className='column is-fullwidth'>
              <div className='box'>
                <div className='level'>
                  <div className='level-left'>
                    <div className='level-item'>
                      <nav
                        className='breadcrumb is-size-7'
                        aria-label='breadcrumbs'
                      >
                        <ul className='margin-10-25'>
                          <li className='is-active'>
                            <Link
                              to='/pengaturan-user/role'
                              aria-current='page'
                            >
                              Role
                            </Link>
                          </li>
                          <li className='is-active'>
                            <Link
                              to='/pengaturan-user/user/export'
                              aria-current='page'
                            >
                              Index
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      {aS.c === true && (
                        <Link
                          to='/pengaturan-user/role/tambah'
                          className='button is-small is-primary is-rounded is-outlined'
                        >
                          <i className='fas fa-plus icon' />
                        </Link>
                      )}
                    </div>
                    <div className='level-item'>
                      <div className='field has-addons'>
                        <p className='control'>
                          <input
                            className='input is-small is-rounded'
                            type='text'
                            placeholder='Cari role'
                          />
                        </p>
                        <p className='control'>
                          <button className='button is-small is-link is-rounded is-outlined'>
                            <i className='fas fa-search' />
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='table-container'>
                  <table className='table is-fullwidth is-hoverable'>
                    <thead>
                      <tr>
                        <th className='has-text-centered'>No</th>
                        <th className='has-text-centered'>Nama Role</th>
                        <th className='has-text-centered'>Dibuat</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading === true ? (
                        <tr>
                          <td>
                            <LoadingButton />
                          </td>
                        </tr>
                      ) : (
                        <Lists auth={auth} aS={aS} roles={roles} />
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='level'>
                  <div className='level-left'>
                    <div className='level-item'>
                      <div className='field has-addons'>
                        <div className='control'>
                          <div className='button is-small is-rounded is-primary is-outlined'>
                            <span className='icon is-small'>
                              <i className='fas fa-chevron-left' />
                            </span>
                          </div>
                        </div>
                        <div className='control'>
                          <div className='button is-small is-disabled'>
                            <span>50-100 of 2000 Role</span>
                          </div>
                        </div>
                        <div className='control'>
                          <div className='button is-small is-rounded is-primary is-outlined'>
                            <span className='icon is-small'>
                              <i className='fas fa-chevron-right' />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='level-right'>
                    <div className='select is-small is-rounded'>
                      <select>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withRouter, connect(mapState, actions))(Index);
