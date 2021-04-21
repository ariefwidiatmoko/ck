import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import LoadingButton from '../../../main/LoadingButton';
import { managerAdd } from './redux/reduxApi';
import { membersIndex } from '../members/redux/reduxApi';
import PageNumber from '../../pages/_part/_fragment/PageNumber';
import SimpleSearch from '../../pages/_part/_fragment/SimpleSearch';
import SetLists from './SetLists';

const mapState = (state) => {
  let aS = {};
  const auth = state.auth;
  if (auth && auth.authorities.details) {
    aS = auth.authorities.details.subm.filter((i) => i.id === 'ketua')[0];
  }
  const details = state.details;
  let detail = {};
  if (details) {
    detail = details.filter((i) => i.id === 'ketua')[0];
  }
  return {
    auth: auth,
    aS: aS,
    detail: detail,
    items: state.members,
    loading: state.async.loading,
  };
};

const actions = {
  closeModal,
  managerAdd,
  membersIndex,
};

class Set extends Component {
  state = {
    tl: 'anggota', // title
    cp: 1, // current page
    itn: 10, // item number
    st: '', // isearch text
  };

  componentDidMount = () => {
    const { auth, membersIndex } = this.props;
    const { itn } = this.state;
    membersIndex(auth.token, itn, 1, '');
  };

  handlePage = (action, value) => {
    const { auth, membersIndex } = this.props;
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
    membersIndex(auth.token, valItn, valCp, valSt);
  };

  onSet = (item) => {
    const { data, auth, managerAdd } = this.props;
    managerAdd(auth, item.code, 'Ketua', data.total);
  };

  render() {
    const { aS, detail, items, loading, closeModal } = this.props;
    const tt = detail && detail.total ? detail.total : 0;
    const { tl, cp, itn } = this.state;
    const itemsFilter = items.filter((item) => item.type !== 'Ketua')
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-info'>
            <div className='modal-card-title has-text-info has-text-weight-normal'>
              <i className='fas fa-tasks icon' /> Set Ketua
            </div>
            <button
              onClick={closeModal}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <section className='modal-card-body is-size-7'>
            <div className='box'>
              <div className='level'>
                <div className='level-left'>
                  <div className='level-item'>
                    <nav
                      className='breadcrumb is-size-7 is-capitalized'
                      aria-label='breadcrumbs'
                    >
                      <ul>
                        <li className='is-active'>Anggota</li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className='level-right'>
                  <div className='level-item'>
                    <SimpleSearch
                      tl={tl}
                      loading={loading}
                      onFormSubmit={this.handlePage}
                    />
                  </div>
                </div>
              </div>
              <div className="table-container">
                <table className="table is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th className="has-text-centered">No</th>
                      <th className="has-text-centered">Kode</th>
                      <th className="has-text-centered">Nama Lengkap</th>
                      <th className="has-text-centered">Status</th>
                      <th className="has-text-centered">Aksi</th>
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
                        <SetLists
                          items={itemsFilter}
                          cp={cp}
                          itn={itn}
                          tl={tl}
                          aS={aS}
                          onSet={this.onSet}
                        />
                      )}
                  </tbody>
                </table>
              </div>
                <PageNumber
                  cp={cp}
                  itn={tt < 10 ? tt : itn}
                  handleNumber={this.handlePage}
                  tt={tt}
                  getPage={this.handlePage}
                  tl={tl}
                />
            </div>
          </section>
          <footer className='modal-card-foot'>
            <button
              className='button custom-grey is-small is-rounded is-outlined'
              onClick={closeModal}
            >
              <i className='fas fa-arrow-left icon' />
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Set);
