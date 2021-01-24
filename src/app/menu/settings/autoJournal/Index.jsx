import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import LoadingButton from '../../../main/LoadingButton';
import Lists from './Lists/Lists';
import { compose } from 'redux';
import { openModal, closeModal } from '../../modals/redux/modalActions';
import { autoJournalsIndex } from './redux/reduxApi';

const mapState = (state) => {
  let aS = {};
  const auth = state.auth;
  if (auth && auth.authorities.details) {
    aS = auth.authorities.details.subm.filter((i) => i.id === 'jurnal-auto')[0];
  }
  return {
    auth: auth,
    aS: aS,
    items: state.autoJournals,
    loading: state.async.loading,
  };
};

const actions = {
  openModal,
  closeModal,
  autoJournalsIndex,
};

class Index extends Component {
  state = {
    tl: 'Jurnal Auto',
    st: '',
  };

  componentDidMount = () => {
    const { auth, autoJournalsIndex } = this.props;
    autoJournalsIndex(auth.token, '');
  };

  onEdit = (item) => {
    const { auth } = this.props;
    this.props.openModal('autoJournalForm', {
      data: {
        item: item,
        auth: auth,
      },
    });
  };

  onDelete = (item) => {
    const { auth } = this.props;
    this.props.openModal('autoJournalDelete', {
      data: {
        item: item,
        auth: auth,
      },
    });
  };

  render() {
    const { aS, items, loading } = this.props;
    const arrTrans = ['savings', 'loans'];
    let sum = 0;
    for (let i = 0; i < arrTrans.length; i++) {
      let a = items.filter((item) => item.name === arrTrans[i]);
      if (a.length === 1) {
        sum = sum + 1;
      }
    }
    const { tl } = this.state;
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
                            <Link to='/pengaturan-umum/jurnal-auto'>{tl}</Link>
                          </li>
                          <li className='is-active'>
                            <Link to='/pengaturan-umum/jurnal-auto'>Index</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      {sum < 2 && aS.c === true && (
                        <>
                          <Link
                            to='/pengaturan-umum/jurnal-auto/tambah'
                            className='button is-small is-primary is-rounded is-outlined mr-1'
                          >
                            <i className='fas fa-plus icon' />
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='table-container'>
                  <table className='table is-fullwidth is-hoverable'>
                    <thead>
                      <tr>
                        <th className='has-text-centered'>No</th>
                        <th className='has-text-centered'>Kode</th>
                        <th className='has-text-centered'>Transaksi</th>
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
                        />
                      )}
                    </tbody>
                  </table>
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
