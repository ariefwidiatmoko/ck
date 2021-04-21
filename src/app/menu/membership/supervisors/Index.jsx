import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { supervisorsIndex } from './redux/reduxApi';
import { openModal, closeModal } from '../../modals/redux/modalActions';
import LoadingButton from '../../../main/LoadingButton';
import Lists from './Lists/Lists';
import { compose } from 'redux';
import PageNumber from '../../pages/_part/_fragment/PageNumber';
import SimpleSearch from '../../pages/_part/_fragment/SimpleSearch';

const mapState = (state) => {
  let aS = {};
  const auth = state.auth;
  if (auth && auth.authorities.details) {
    aS = auth.authorities.details.subm.filter(
      (i) => i.id === 'badan-pengawas'
    )[0];
  }
  const details = state.details;
  let detail = {};
  if (details) {
    detail = details.filter((i) => i.id === 'badan-pengawas')[0];
  }
  return {
    auth: auth,
    aS: aS,
    detail: detail,
    items: state.supervisors,
    loading: state.async.loading,
  };
};

const actions = {
  supervisorsIndex,
  openModal,
  closeModal,
};

class Index extends Component {
  state = {
    tl: 'pengawas',
    cp: 1,
    itn: 10,
    st: '',
    mB: false,
  };

  componentDidMount = () => {
    const { auth, supervisorsIndex } = this.props;
    const { itn } = this.state;
    supervisorsIndex(auth.token, itn, 1, '');
    // console.log(location.pathname);
  };

  handlePage = (action, value) => {
    const { auth, supervisorsIndex } = this.props;
    const { cp, itn, st } = this.state;
    const objAction = {
      itemNumber: {
        cp: 1,
        itn: value,
        st: st,
      },
      page: {
        cp: cp + value,
        itn: itn,
        st: st,
      },
      simpleSearch: {
        cp: 1,
        itn: itn,
        st: value,
      },
    };
    this.setState(objAction[action]);
    const valItn = objAction[action].itn;
    const valCp = objAction[action].cp;
    const valSt = objAction[action].st;
    supervisorsIndex(auth.token, valItn, valCp, valSt);
  };

  handleMoreButton = () => {
    const { mB } = this.state;
    this.setState({
      mB: !mB,
    });
  };

  itnRed = () => {
    const { itn } = this.state;
    this.setState({
      itn: itn - 1,
    });
  };

  onSet = () => {
    const { openModal, detail } = this.props;
    openModal('SupervisorSet', {
      data: {
        total: detail.total
      }
    });
  };

  onUnset = (item) => {
    const { auth, detail, openModal } = this.props;
    openModal('SupervisorUnset', {
      data: {
        item: item,
        auth: auth,
        total: detail.total,
        itnRed: this.itnRed,
      },
    });
  };

  render() {
    const { aS, detail, items, loading, openModal } = this.props;
    const tt = detail && detail.total ? detail.total : 0;
    const { tl, cp, itn, mB } = this.state;
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
                        className='breadcrumb is-size-7 is-capitalized'
                        aria-label='breadcrumbs'
                      >
                        <ul>
                          <li className='is-active'>
                            <Link to='/keanggotaan/badan-pengawas'>Badan {tl}</Link>
                          </li>
                          <li className='is-active'>
                            <Link to='/keanggotaan/badan-pengawas'>Index</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      {aS.c === true && (
                        <Fragment>
                          <button
                            onClick={this.onSet}
                            className='button is-small is-primary is-rounded is-outlined'
                            style={{ marginRight: 10 }}
                          >
                            <i className='fas fa-plus icon' />
                          </button>
                        </Fragment>
                      )}
                      <SimpleSearch
                        tl={tl}
                        loading={loading}
                        onFormSubmit={this.handlePage}
                      />
                      <div>
                        <div
                          className={
                            mB === true
                              ? 'dropdown is-right is-active'
                              : 'dropdown'
                          }
                        >
                          <div className='dropdown-trigger ml-2'>
                            <button
                              className='button is-small is-rounded is-outlined'
                              aria-haspopup='true'
                              aria-controls='dropdown-menu'
                              onClick={this.handleMoreButton}
                            >
                              <i
                                className={
                                  mB === true
                                    ? 'fas fa-times icon'
                                    : 'fas fa-ellipsis-h icon'
                                }
                              />
                            </button>
                          </div>
                          <div
                            className='dropdown-menu'
                            id='dropdown-menu'
                            role='menu'
                          >
                            <div className='dropdown-content'>
                              <div
                                onClick={() => {
                                  openModal('AdvanceSearch');
                                  this.setState({ mB: !mB });
                                }}
                                className='dropdown-item hand-pointer'
                              >
                                <i className='fas fa-search-plus icon'></i>
                                Pencarian+
                              </div>
                              <Link
                                to='/keanggotaan/anggota/import'
                                className='dropdown-item'
                              >
                                <i className='fas fa-file-import icon'></i>
                                Import
                              </Link>
                              <Link
                                to='/keanggotaan/anggota/recyclebin'
                                className='dropdown-item'
                              >
                                <i className='fas fa-trash icon'></i>
                                Recycle Bin
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='table-container'>
                  <table className='table is-fullwidth is-hoverable'>
                    <thead>
                      <tr>
                        <th className='has-text-centered'>No</th>
                        <th className='has-text-centered'>Kode</th>
                        <th className='has-text-centered'>Nama</th>
                        <th className='has-text-centered'>Nama Lengkap</th>
                        <th className='has-text-centered'>Gabung</th>
                        <th className='has-text-centered'>Status</th>
                        <th className='has-text-centered'>Aksi</th>
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
                        <Lists
                          items={items}
                          cp={cp}
                          itn={itn}
                          tl={tl}
                          aS={aS}
                          onUnset={this.onUnset}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
                <PageNumber
                  cp={cp}
                  itn={itn}
                  handleNumber={this.handlePage}
                  tt={tt}
                  getPage={this.handlePage}
                  tl={tl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withRouter, connect(mapState, actions))(Index);
