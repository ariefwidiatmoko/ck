import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { recyclebinsIndex } from './redux/reduxApi';
import { openModal, closeModal } from '../modals/redux/modalActions';
import LoadingButton from '../../main/LoadingButton';
import Lists from './Lists/Lists';
import { compose } from 'redux';
import PageNumber from '../pages/_part/_fragment/PageNumber';
import SimpleSearch from '../pages/_part/_fragment/SimpleSearch';

const mapState = (state) => {
  let aS = {};
  const auth = state.auth;
  if (auth && auth.authorities.details) {
    aS = auth.authorities.details.m.filter((i) => i.id === 'recyclebin')[0];
  }
  const details = state.details;
  let detail = {};
  if (details) {
    detail = details.filter((i) => i.id === 'recyclebin')[0];
  }
  return {
    auth: state.auth,
    aS: aS,
    detail: detail,
    items: state.recyclebins,
    loading: state.async.loading,
  };
};

const actions = {
  recyclebinsIndex,
  openModal,
  closeModal,
};

class Index extends Component {
  state = {
    tl: 'recycle bin',
    cp: 1,
    itn: 10,
    st: '',
    mB: false,
  };

  componentDidMount = () => {
    const { auth, recyclebinsIndex } = this.props;
    const { itn } = this.state;
    recyclebinsIndex(auth.token, itn, 1, '');
  };

  handleItemNumber = (number) => {
    const { auth, recyclebinsIndex } = this.props;
    const { st } = this.state;
    this.setState((prevState) => ({
      cp: 1,
      itn: number,
    }));
    recyclebinsIndex(auth.token, number, 1, st);
  };

  handlePage = (number) => {
    const { auth, recyclebinsIndex } = this.props;
    const { cp, itn, st } = this.state;
    this.setState({
      cp: cp + number,
    });
    recyclebinsIndex(auth.token, itn, cp + number, st);
  };

  handleSimpleSearch = (st) => {
    const { auth, recyclebinsIndex } = this.props;
    const { itn } = this.state;
    this.setState((prevState) => ({
      cp: 1,
      itn: itn,
      st: st,
    }));
    recyclebinsIndex(auth.token, itn, 1, st);
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

  onRestore = (item) => {
    const { auth, detail, openModal } = this.props;
    openModal('RecyclebinRestore', {
      data: {
        item: item,
        auth: auth,
        total: detail.total,
        itnRed: this.itnRed,
      },
    });
  };

  onDelete = (item) => {
    const { auth, detail, openModal } = this.props;
    openModal('RecyclebinDelete', {
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
    const { tl, cp, itn, st, mB } = this.state;
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
                            <Link to='/recyclebin'>{tl}</Link>
                          </li>
                          <li className='is-active'>
                            <Link to='/recyclebin'>Index</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      {st && st.length > 0 && (
                        <Link
                          to='/recyclebin'
                          className='button is-small is-primary is-rounded is-outlined'
                          style={{ marginRight: 10 }}
                        >
                          <i className='fas fa-redo icon' />
                        </Link>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='table-container'>
                  <table className='table is-fullwidth is-hoverable is-bordered'>
                    <thead>
                      <tr>
                        <th className='has-text-centered'>No</th>
                        <th className='has-text-centered'>Kode</th>
                        <th className='has-text-centered'>Item</th>
                        <th className='has-text-centered'>Kategori</th>
                        <th className='has-text-centered'>Dihapus pada</th>
                        <th className='has-text-centered'>Dihapus oleh</th>
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
                          onRestore={this.onRestore}
                          onDelete={this.onDelete}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
                <PageNumber
                  cp={cp}
                  itn={tt < 10 ? tt : itn}
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
