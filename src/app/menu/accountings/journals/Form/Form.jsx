import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateEdit from './CreateEdit';
import { journalAdd } from '../redux/reduxApi';
import { autoJournalsIndex } from '../../../settings/autoJournal/redux/reduxApi';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { openModal, closeModal } from '../../../modals/redux/modalActions';
import { toastr } from 'react-redux-toastr';
import { format, parseISO } from 'date-fns';
import { numFormatted } from '../../../../common/helpers/othersHelpers';

const mapState = (state, ownProps) => {
  const code = ownProps.match.params.id;
  // Get Transaction Type & Code
  const newArr = code.split('_');
  // Get Source Detail of Transaction
  let newDat;
  if (state[newArr[0]]) {
    newDat = state[newArr[0]].filter((i) => i.code === newArr[1])[0];
  }
  // Get Transaction Number
  const arr = Object.entries(newDat);
  let arrNum = [];
  for (const [key, value] of arr) {
    if (value !== null && value) {
      const num = Number(value);
      if (
        !isNaN(num) &&
        key !== 'id' &&
        key !== 'userId' &&
        key !== 'profileId' &&
        key !== 'createdBy'
      ) {
        arrNum.push(Number(value));
      }
    }
  }
  // Get Auto Journal
  let autoJournal;
  let transactionName;
  let debit;
  let credit;
  let debCre;
  if (state.autoJournals && state.autoJournals[0]) {
    autoJournal = state.autoJournals.filter((i) => i.name === newArr[0])[0];
    transactionName = autoJournal.name;
    debit = JSON.parse(autoJournal.debit);
    credit = JSON.parse(autoJournal.credit);
    debCre = [...debit, ...credit];
  }
  return {
    loading: state.async.loading,
    transType: newArr[0],
    transactionName,
    autoJournal: debCre,
    arrDeb: debit,
    arrCre: credit,
    arrNum: arrNum,
    item: newDat,
    auth: state.auth,
  };
};

const actions = {
  journalAdd,
  openModal,
  closeModal,
  autoJournalsIndex,
};

class Form extends Component {
  state = {
    tl: 'jurnal',
    selectedTransaction: this.props.transactionName || '',
    selectedAccount: this.props.autoJournal || [],
    visible: false,
  };

  componentDidMount = () => {
    const { autoJournalsIndex, auth, arrDeb, arrCre, arrNum } = this.props;
    autoJournalsIndex(auth.token, '');
    let sumNum;
    if (arrDeb && arrCre && arrDeb.length < arrCre.length) {
      sumNum = arrNum.reduce((a, b) => a + b, 0);
      this.setState({
        [arrDeb[0].code]: sumNum,
      });
    }
    if (arrCre && arrCre.length > 0) {
      for (let i = 0; i < arrNum.length; i++) {
        this.setState({
          [arrCre[i].code]: arrNum[i],
        });
      }
    }
  };

  onSelectAccount = (values) => {
    const { closeModal } = this.props;
    const { selectedAccount } = this.state;
    const updateArr = [...selectedAccount, values];
    this.setState({
      selectedAccount: updateArr,
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

  onClickCell = () => {
    this.setState({
      visible: true,
    });
  };

  onBlur = (e) => {
    this.setState({
      visible: false,
    });
  };

  onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  onSelectText = (e) => {
    e.target.select();
  };

  onClickSubmit = () => {
    const { auth, journalAdd } = this.props;

    const { selectedAccount, remarks } = this.state;
    if (selectedAccount === undefined) {
      toastr.error('Error', `Tambahkan Debit dan Kredit terisi!`);
      return;
    }
    let arrD = selectedAccount.filter((i) => i.dK === 'D');
    let arrK = selectedAccount.filter((i) => i.dK === 'K');
    if (arrD.length < 1 || arrK.length < 1) {
      toastr.error('Error', `Pastikan Debit dan Kredit terisi!`);
      return;
    }
    let debit = [];
    let credit = [];
    let numD = 0;
    let numK = 0;
    for (let i = 0; i < arrD.length; i++) {
      let checkNumber = Number(this.state[arrD[i].code]);
      let a = {
        id: arrD[i].id,
        code: arrD[i].code,
        name: arrD[i].name,
        sum: checkNumber,
        type: arrD[i].dK,
      };
      if (checkNumber === undefined || Number.isNaN(checkNumber)) {
        toastr.error('Error', `Pastikan nilai Debit dan kredit terisi!`);
        return;
      }
      numD = numD + a.sum;
      debit = [...debit, a];
    }
    for (let i = 0; i < arrK.length; i++) {
      let checkNumber = Number(this.state[arrK[i].code]);
      let a = {
        id: arrK[i].id,
        code: arrK[i].code,
        name: arrK[i].name,
        sum: checkNumber,
        type: arrK[i].dK,
      };
      if (checkNumber === undefined || Number.isNaN(checkNumber)) {
        toastr.error('Error', `Pastikan nilai Debit dan kredit terisi!`);
        return;
      }
      numK = numK + a.sum;
      credit = [...credit, a];
    }
    if (numD !== numK) {
      toastr.error('Error', `Jumlah nilai Debit dan Kredit tidak sama!`);
      return;
    }
    const deb = JSON.stringify(debit);
    const cre = JSON.stringify(credit);
    const transaction = { debit: deb, credit: cre, remarks };
    journalAdd(transaction, auth);
  };

  render() {
    const { item, history } = this.props;
    const { selectedAccount, remarks, visible } = this.state;
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
                  <div className='column is-three-quarters-desktop is-full-mobile'>
                    <div className='box'>
                      <CreateEdit
                        history={history}
                        stateT={this.state}
                        initialValues={item}
                        transactions={selectedAccount}
                        remarks={remarks}
                        visible={visible}
                        onClickAccount={this.onClickAccount}
                        onClickSubmit={this.onClickSubmit}
                        onRemoveAccount={this.onRemoveAccount}
                        onClickCell={this.onClickCell}
                        onBlur={this.onBlur}
                        onChangeInput={this.onChangeInput}
                        onSelectText={this.onSelectText}
                      />
                    </div>
                  </div>
                  <div className='column'>
                    <div className='box'>
                      <table className='table is-hoverable is-narrow is-fullwidth'>
                        <thead>
                          <tr>
                            <th
                              colSpan='2'
                              className='has-background-grey-lighter'
                            >
                              <div>Info</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className='is-size-7'>Kode</div>
                            </td>
                            <td>
                              <div className='has-text-link-dark is-size-7 has-text-right'>
                                {item.code}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className='is-size-7'>Simpanan Pokok</div>
                            </td>
                            <td>
                              <div className='has-text-link-dark is-size-7 has-text-right'>
                                {item.primary !== null
                                  ? 'Rp' + numFormatted(item.primary)
                                  : ''}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className='is-size-7'>Simpanan Wajib</div>
                            </td>
                            <td>
                              <div className='has-text-link-dark is-size-7 has-text-right'>
                                {item.secondary !== null
                                  ? 'Rp' + numFormatted(item.secondary)
                                  : ''}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className='is-size-7'>Simpanan Sukarela</div>
                            </td>
                            <td>
                              <div className='has-text-link-dark is-size-7 has-text-right'>
                                {item.tertier !== null
                                  ? 'Rp' + numFormatted(item.tertier)
                                  : ''}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className='is-size-7'>Tanggal</div>
                            </td>
                            <td>
                              <div className='has-text-link-dark is-size-7 has-text-right'>
                                {item.date &&
                                  format(parseISO(item.date), 'd LLLL yyyy')}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className='is-size-7'>Keterangan</div>
                            </td>
                            <td>
                              <div className='has-text-link-dark is-size-7 has-text-right'>
                                {item.remarks !== null ? item.remarks : '-'}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
