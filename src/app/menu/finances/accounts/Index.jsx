import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { accountsIndex } from './redux/reduxApi';
import { openModal, closeModal } from '../../modals/redux/modalActions';
import LoadingButton from '../../../main/LoadingButton';
import Lists from './Lists/Lists';
import { compose } from 'redux';
import PageNumber from '../../pages/_part/_fragment/PageNumber';
import SimpleSearch from '../../pages/_part/_fragment/SimpleSearch';

const mapState = (state) => {
  let aS = {};
  if (state.auth) {
    aS = state.auth.arrAuth.detail.subm.filter((i) => i.id === 'akun')[0];
  }
  let totals = {};
  if (state.details) {
    totals = state.details.filter((i) => i.id === 'akun')[0];
  }
  return {
    auth: state.auth,
    aS: aS,
    totals: totals,
    items: state.accounts,
    loading: state.async.loading,
  };
};

const actions = {
  accountsIndex,
  openModal,
  closeModal,
};

class Index extends Component {
  state = {
    tl: 'akun',
    cp: 1,
    itn: 10,
    st: '',
    mB: false,
  };

  componentDidMount = () => {
    const { auth } = this.props;
    const { itn } = this.state;
    this.props.accountsIndex(auth.token, itn, 1, '');
  };

  handleItemNumber = (number) => {
    const { auth } = this.props;
    const { st } = this.state;
    this.setState((prevState) => ({
      cp: 1,
      itn: number,
    }));
    this.props.accountsIndex(auth.token, number, 1, st);
  };

  handlePage = (number) => {
    const { auth } = this.props;
    const { cp, itn, st } = this.state;
    this.setState({
      cp: cp + number,
    });
    this.props.accountsIndex(auth.token, itn, cp + number, st);
  };

  handleSimpleSearch = (st) => {
    const { auth } = this.props;
    const { itn } = this.state;
    this.setState((prevState) => ({
      cp: 1,
      itn: itn,
      st: st,
    }));
    this.props.accountsIndex(auth.token, itn, 1, st);
  };

  handleMoreButton = () => {
    const { mB } = this.state;
    this.setState({
      mB: !mB,
    });
  };

  onDelete = (id, code, name) => {
    const { auth } = this.props;
    this.props.openModal('AccountDelete', {
      id: id,
      code: code,
      name: name,
      auth: auth,
    });
  };

  render() {
    const { aS, totals, items, loading, openModal } = this.props;
    const tt = totals && totals.total ? totals.total : 0;
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
                            <Link to='/keuangan/akun'>{tl}</Link>
                          </li>
                          <li className='is-active'>
                            <Link to='/keuangan/akun'>Index</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      {aS.c === true && (
                        <Fragment>
                          <Link
                            to='/keuangan/akun/tambah'
                            className='button is-small is-primary is-rounded is-outlined'
                            style={{ marginRight: 10 }}
                          >
                            <i className='fas fa-plus icon' />
                          </Link>
                        </Fragment>
                      )}
                      <SimpleSearch
                        tl={tl}
                        loading={loading}
                        onFormSubmit={this.handleSimpleSearch}
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
                                to='/keuangan/akun/import'
                                className='dropdown-item'
                              >
                                <i className='fas fa-file-import icon'></i>
                                Import
                              </Link>
                              <Link
                                to='/keuangan/akun/recyclebin'
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
                        <th className='has-text-centered'>Akun</th>
                        <th className='has-text-centered'>H / D</th>
                        <th className='has-text-centered'>Tipe</th>
                        <th className='has-text-centered'>Level</th>
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
                          onDelete={this.onDelete}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
                <PageNumber
                  cp={cp}
                  itn={itn}
                  handleNumber={this.handleItemNumber}
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
