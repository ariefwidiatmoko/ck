import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../modals/redux/modalActions';
import { autoJournalAdd, autoJournalEdit } from './redux/reduxApi';
import CreateEdit from './CreateEdit';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { toastr } from 'react-redux-toastr';

const mapState = (state, ownProps) => {
  const code = ownProps.match.params.id;
  const autoJournals = state.autoJournals;
  let autoJournal;
  let transactionName;
  let debit;
  let credit;
  let transactions;
  if (autoJournals && autoJournals.length !== 0 && code) {
    autoJournal = autoJournals.filter((i) => i.code === code)[0];
    transactionName = autoJournal.name;
    debit = JSON.parse(autoJournal.debit);
    credit = JSON.parse(autoJournal.credit);
    transactions = [...debit, ...credit];
  }
  return {
    code,
    loading: state.async.loading,
    transactionName,
    transactions,
    auth: state.auth,
  };
};

const actions = {
  openModal,
  closeModal,
  autoJournalAdd,
  autoJournalEdit,
};

class Form extends Component {
  state = {
    tl: 'Jurnal Auto',
    selectedTransaction: this.props.transactionName || '',
    selectedAccount: this.props.transactions || [],
  };
  // handle Select Option Transaction Name
  onChangeSelect = (e) => {
    this.setState({
      selectedTransaction: e.target.value,
    });
  };
  // handle Select Account
  onSelectAccount = (values) => {
    const { closeModal } = this.props;
    const { selectedAccount } = this.state;
    const a = {
      id: values.id,
      code: values.code,
      name: values.name,
      type: values.type,
      dK: values.dK,
    };
    const updateArr = [...selectedAccount, a];
    const filterD = updateArr.filter((i) => i.dK === 'D');
    const filterK = updateArr.filter((i) => i.dK === 'K');
    const debCre = [...filterD, ...filterK];
    this.setState({
      selectedAccount: debCre,
    });
    closeModal();
  };

  onClickAccount = (values) => {
    const { openModal } = this.props;
    const { selectedAccount } = this.state;
    openModal('JournalPickAccount', {
      data: {
        onSelectAccount: this.onSelectAccount,
        selectedAccount: selectedAccount,
        dK: values,
      },
    });
  };

  onRemoveAccount = (values) => {
    const { selectedAccount } = this.state;
    const newArr = selectedAccount.filter((i) => i.code !== values.code);
    this.setState({
      selectedAccount: newArr,
    });
  };

  onClickSubmit = () => {
    const { code, auth, autoJournalAdd, autoJournalEdit } = this.props;
    const { selectedAccount, selectedTransaction } = this.state;
    const arrD = selectedAccount.filter((i) => i.dK === 'D');
    const arrK = selectedAccount.filter((i) => i.dK === 'K');
    if (selectedTransaction.length === 0) {
      toastr.error('Error', `Pastikan Jurnal Auto dipilih!`);
      return;
    }
    if (arrD.length === 0 || arrK.length === 0) {
      toastr.error('Error', `Pastikan debit dan kredit telah dipilih!`);
      return;
    }
    let debit = JSON.stringify(arrD);
    let credit = JSON.stringify(arrK);
    if (code) {
      autoJournalEdit({ name: selectedTransaction, debit, credit }, auth, code);
    } else {
      autoJournalAdd({ name: selectedTransaction, debit, credit }, auth);
    }
  };

  render() {
    const { openModal, closeModal, history } = this.props;
    const { selectedTransaction, selectedAccount } = this.state;
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
                        <ul>
                          <li className='is-active'>
                            <Link to='/akuntansi/jurnal'>Jurnal</Link>
                          </li>
                          <li className='is-active'>
                            <Link to='/akuntansi/jurnal'>Tambah</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      <div className='buttons'>
                        <button
                          type='button'
                          onClick={history.goBack}
                          className='button custom-grey is-small is-rounded is-outlined'
                        >
                          <i className='fas fa-arrow-left icon' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='columns'>
                  <div className='column'>
                    <div className='box'>
                      <CreateEdit
                        itemName={selectedTransaction}
                        items={selectedAccount}
                        openModal={openModal}
                        closeModal={closeModal}
                        history={history}
                        onChangeSelect={this.onChangeSelect}
                        onClickAccount={this.onClickAccount}
                        onRemoveAccount={this.onRemoveAccount}
                        onClickSubmit={this.onClickSubmit}
                      />
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

export default compose(withRouter, connect(mapState, actions))(Form);
