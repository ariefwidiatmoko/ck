import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import LoadingButton from '../../../main/LoadingButton';
import { compose } from 'redux';
import { format } from 'date-fns';
import { openModal } from '../../modals/redux/modalActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toastr } from 'react-redux-toastr';
import { parseISO } from 'date-fns';
import { usersFetch } from '../Users/redux/reduxApi';

const mapState = (state) => ({
  auth: state.auth,
  users: state.users,
  loading: state.async.loading,
});

const actions = {
  openModal,
  usersFetch,
};

class Index extends Component {
  componentDidMount = () => {
    this.props.usersFetch(this.props.auth.token);
  };
  render() {
    const { users, openModal, loading } = this.props;
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable'>
            <div className='column'>
              <div className='box'>
                <nav className='breadcrumb' aria-label='breadcrumbs'>
                  <ul>
                    <li className='is-active'>
                      <Link to='/pengaturan-user/aktivasi'>Aktivasi</Link>
                    </li>
                    <li className='is-active'>
                      <Link to='/pengaturan-user/aktivasi'>Index</Link>
                    </li>
                  </ul>
                </nav>
                <div className='level'>
                  <div className='level-left'>
                    <div className='level-item'>
                      <div className='field has-addons'>
                        <p className='control'>
                          <input
                            className='input is-small is-rounded'
                            type='text'
                            placeholder='Cari user'
                          />
                        </p>
                        <p className='control'>
                          <button className='button is-small is-link is-rounded is-outlined'>
                            <i className='fas fa-search' />
                          </button>
                        </p>
                      </div>
                    </div>
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
                            <span>50-100 of 2000 User</span>
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
                    <div className='level-item'>
                      <div className='select is-small is-rounded'>
                        <select>
                          <option>Semua User</option>
                          <option>Aktif</option>
                          <option>Tidak Aktif</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='table-container'>
                  <table className='table is-fullwidth is-hoverable'>
                    <thead>
                      <tr>
                        <th className='has-text-centered'>No</th>
                        <th className='has-text-centered'>Username</th>
                        <th className='has-text-centered'>Kode Aktivasi</th>
                        <th className='has-text-centered'>Aktif</th>
                        <th className='has-text-centered'>Salin kode</th>
                        <th className='has-text-centered'>Dibuat</th>
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
                        <Lists users={users} openModal={openModal} />
                      )}
                    </tbody>
                  </table>
                </div>
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
    );
  }
}

export default compose(withRouter, connect(mapState, actions))(Index);

class Lists extends Component {
  render() {
    const { users, loading, openModal } = this.props;
    return (
      <Fragment>
        {users &&
          users.length !== 0 &&
          users.map((user, index) => (
            <Item
              key={user.id}
              index={index}
              user={user}
              loading={loading}
              openModal={openModal}
            />
          ))}
        {users && users.length === 0 && (
          <tr>
            <td>Tidak Ada User</td>
          </tr>
        )}
      </Fragment>
    );
  }
}

class Item extends Component {
  state = {
    value: '',
    copied: false,
  };

  handleCopy = () => {
    toastr.success(
      'Success',
      `Email: ${this.props.user.email}, Activation Code: ${this.props.user.activationCode} is copied`
    );
  };

  render() {
    const { user, index, loading } = this.props;
    if (loading)
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    return (
      <tr>
        <td className='has-text-centered'>{index + 1}</td>
        <td>{user.email}</td>
        <td className='has-text-centered'>{user.activationCode}</td>
        <td className='has-text-centered'>
          {user.activated ? (
            <i className='icon has-text-success fas fa-check-circle'></i>
          ) : (
            <i className='icon has-text-grey fas fa-circle'></i>
          )}
        </td>
        <td className='has-text-centered'>
          <CopyToClipboard
            text={`Username: ${user.username}, Kode Aktivasi: ${user.activationCode}`}
            onCopy={() => this.setState({ copied: true })}
          >
            <button
              onClick={() => this.handleCopy()}
              className='button is-small is-rounded is-white is-text'
            >
              <i className='icon fas fa-copy'></i>
            </button>
          </CopyToClipboard>
        </td>
        <td className='has-text-centered'>
          {user.createdAt &&
            format(parseISO(user.createdAt), 'd LLLL yyyy hh:mm:aa')}
        </td>
      </tr>
    );
  }
}
