import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { accountsIndex } from './redux/reduxApi';
import { openModal, closeModal } from '../../modals/redux/modalActions';
import LoadingButton from '../../../main/LoadingButton';
import Lists from './Lists/Lists';
import { compose } from 'redux';
import SimpleSearch from '../../pages/_part/_fragment/SimpleSearch';

const mapState = (state) => {
  let aS = {};
  const auth = state.auth;
  if (auth && auth.authorities.details) {
    aS = auth.authorities.details.subm.filter((i) => i.id === 'akun')[0];
  }
  const details = state.details
  let detail = {};
  if (details) {
    detail = details.filter((i) => i.id === 'akun')[0];
  }
  return {
    auth: auth,
    aS: aS,
    detail: detail,
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
    st: '',
    mB: false,
  };

  componentDidMount = () => {
    const { auth } = this.props;
    this.props.accountsIndex(auth.token, '');
  };

  handleItemNumber = (number) => {
    const { auth } = this.props;
    const { st } = this.state;
    this.props.accountsIndex(auth.token, st);
  };

  handlePage = (number) => {
    const { auth } = this.props;
    const { st } = this.state;
    this.props.accountsIndex(auth.token, st);
  };

  handleSimpleSearch = (st) => {
    const { auth } = this.props;
    this.setState((prevState) => ({
      st: st,
    }));
    this.props.accountsIndex(auth.token, st);
  };

  handleMoreButton = () => {
    const { mB } = this.state;
    this.setState({
      mB: !mB,
    });
  };
  
  onClickRecyclebin = () => {
    const { auth, accountsIndex } = this.props;
    const { mB } = this.state;
    this.setState({
      st: 'deleted',
    });
    accountsIndex(auth.token, 'deleted');
    this.setState({
      mB: !mB,
    });
  };

  onEdit = (item) => {
    const { auth } = this.props;
    this.props.openModal('AccountForm', {
      data: {
        item: item,
        auth: auth,
      },
    });
  };

  itnRed = () => {
    const { itn } = this.state;
    this.setState({
      itn: itn - 1,
    });
  };

  onDelete = (item) => {
    const { auth } = this.props;
    this.props.openModal('AccountDelete', {
      data: {
        item: item,
        auth: auth,
      },
    });
  };

  onRestore = (item) => {
    const { auth, detail, openModal } = this.props;
    openModal('AccountRestore', {
      data: {
        item: item,
        auth: auth,
        total: detail.total,
        itnRed: this.itnRed,
      },
    });
  };

  onHDelete = (item) => {
    const { auth, detail, openModal } = this.props;
    openModal('AccountHardDel', {
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
    const { tl, st, mB } = this.state;
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
                            <Link to='/akuntansi/akun'>{tl}</Link>
                          </li>
                          <li className='is-active'>
                            <Link to='/akuntansi/akun'>Index</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      {st && st.length > 0 && (
                        <Link
                          to='/akuntansi/akun'
                          className='button is-small is-primary is-rounded is-outlined'
                          style={{ marginRight: 10 }}
                        >
                          <i className='fas fa-redo icon' />
                        </Link>
                      )}
                      {aS.c === true && (
                        <>
                          <button
                            onClick={() =>
                              openModal('AccountForm', {
                                data: { item: { id: null } },
                              })
                            }
                            className='button is-small is-primary is-rounded is-outlined mr-1'
                          >
                            <i className='fas fa-plus icon' />
                          </button>
                        </>
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
                                to='/akuntansi/akun/import'
                                className='dropdown-item'
                              >
                                <i className='fas fa-file-import icon'></i>
                                Impor
                              </Link>
                              <div
                                onClick={this.onClickRecyclebin}
                                className='dropdown-item hand-pointer'
                              >
                                <i className='fas fa-trash icon'></i>
                                Recycle Bin
                              </div>
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
                        <th className='has-text-centered'>Tipe</th>
                        <th className='has-text-centered'>H / D</th>
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
                          tl={tl}
                          aS={aS}
                          onEdit={this.onEdit}
                          onDelete={this.onDelete}
                          onRestore={this.onRestore}
                          onHDelete={this.onHDelete}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='level'>
                  <div className='level-left'>
                    <div className='level-item'>
                      <div className='field has-addons'>
                        <div className='control'>
                          <button
                            disabled
                            className='button is-small is-rounded is-primary is-outlined'
                          >
                            <span className='icon is-small'>
                              <i className='fas fa-chevron-left' />
                            </span>
                          </button>
                        </div>
                        <div className='control'>
                          <div className='button is-small is-disabled'>
                            {tt > 0 && (
                              <span>
                                1 - {tt} dari {tt} {tl}
                              </span>
                            )}
                            {tt < 1 && <span>0 {tl}</span>}
                          </div>
                        </div>
                        <div className='control'>
                          <button
                            disabled
                            className='button is-small is-rounded is-primary is-outlined'
                          >
                            <span className='icon is-small'>
                              <i className='fas fa-chevron-right' />
                            </span>
                          </button>
                        </div>
                      </div>
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
