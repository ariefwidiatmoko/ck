import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { loanAdd } from './redux/reduxApi';
import { membersIndex } from '../../membership/members/redux/reduxApi';
import AddForm from './AddForm';
import MemberPick from './MemberPick';
import SimpleSearch from '../../pages/_part/_fragment/SimpleSearch';

const mapState = (state) => {
  let detail = {};
  if (state.details) {
    detail = state.details.filter((i) => i.id === 'anggota')[0];
  }
  return {
    loading: state.async.loading,
    detail: detail,
    members: state.members,
    auth: state.auth,
  };
};

const actions = {
  closeModal,
  membersIndex,
  loanAdd,
};

class Add extends Component {
  state = {
    tl: 'anggota',
    cp: 1,
    itn: 10,
    st: '',
    initialValues: {},
    hover: false,
    elementId: null,
    open: true,
    sumTotal: 0,
    installment: 0,
    installmentFix: 0,
  };

  componentDidMount = () => {
    const { auth, membersIndex } = this.props;
    membersIndex(auth.token, 10, 1, '');
  };

  onHover = (e, value) => {
    this.setState({
      hover: value,
      elementId: value === true ? e.target.dataset.id : null,
    });
  };

  onClickMember = (values) => {
    let member = values;
    this.setState({
      initialValues: { ...member, date: new Date() },
    });
  };

  componentDidMount = () => {
    const { auth, membersIndex } = this.props;
    const { itn } = this.state;
    membersIndex(auth.token, itn, 1, '');
  };

  handleItemNumber = (number) => {
    const { auth, membersIndex } = this.props;
    const { st } = this.state;
    this.setState((prevState) => ({
      cp: 1,
      itn: number,
    }));
    membersIndex(auth.token, number, 1, st);
  };

  handlePage = (number) => {
    const { auth, membersIndex } = this.props;
    const { cp, itn, st } = this.state;
    this.setState({
      cp: cp + number,
    });
    membersIndex(auth.token, itn, cp + number, st);
  };

  handleSimpleSearch = (st) => {
    const { auth, membersIndex } = this.props;
    const { itn } = this.state;
    this.setState((prevState) => ({
      cp: 1,
      itn: itn,
      st: st,
    }));
    membersIndex(auth.token, itn, 1, st);
  };

  countInstallment = (ls, mt, it, adm, crk, ot, lsa) => {
    let sumTotal, installment, installmentFix;
    sumTotal =
      Number(ls) +
      (Number(it) * Number(ls)) / 100 +
      Number(adm) +
      Number(crk) +
      Number(ot) +
      Number(lsa);
    installment = sumTotal > 0 ? Math.round(sumTotal / Number(mt)) : 0;
    let roundN = installment > 0 ? Math.round(installment / 1000) : 0;
    let stringN = roundN > 0 ? roundN + '' : '';
    let lastN = stringN.length > 0 ? stringN[stringN.length - 1] : 0;
    let numberN = lastN === 'string' ? Number(lastN) : lastN;
    installmentFix =
      numberN >= 1
        ? numberN >= 6
          ? (roundN + (10 - numberN)) * 1000
          : (roundN + 5 - numberN) * 1000
        : (roundN - numberN) * 1000;
    return {
      sumTotal: sumTotal,
      installment: installment,
      installmentFix: installmentFix,
    };
  };

  onFormSubmit = (val) => {
    const { auth, loanAdd, data } = this.props;
    const values = this.countInstallment(
      val.loanSum || 0,
      val.month || 1,
      val.interest || 2,
      val.adm || 0,
      val.crk || 0,
      val.others || 0,
      val.loanSaving || 0
    );
    let sumTotal = values.sumTotal;
    let installment = values.installment;
    let installmentFix = values.installmentFix;
    const newVal = { ...val, sumTotal, installment, installmentFix };
    try {
      loanAdd(newVal, auth, data.total);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { detail, members, loading, closeModal, loanAdd } = this.props;
    const tt = detail && detail.total ? detail.total : 0;
    const { tl, cp, itn, initialValues, elementId } = this.state;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-size-6'>
              <i className='fas fa-file-invoice-dollar icon mr-1' />
              {initialValues !== undefined
                ? `Tambah Pinjaman [${initialValues.code} - ${initialValues.name}]`
                : 'Pilih anggota...'}
            </div>
            {initialValues === undefined && (
              <SimpleSearch
                tl={tl}
                loading={loading}
                onFormSubmit={this.handleSimpleSearch}
              />
            )}
          </header>
          {initialValues && initialValues.id === undefined && (
            <MemberPick
              items={members}
              tl={tl}
              cp={cp}
              itn={itn}
              tt={tt}
              loading={loading}
              onClickMember={this.onClickMember}
              onHover={this.onHover}
              elementId={elementId}
              closeModal={closeModal}
              handleItemNumber={this.handleItemNumber}
              handlePage={this.handlePage}
            />
          )}
          {initialValues && initialValues.id !== undefined && (
            <AddForm
              initialValues={{ ...initialValues, interest: 2 }}
              onFormSubmit={this.onFormSubmit}
              loanAdd={loanAdd}
              closeModal={closeModal}
              countInstallment={this.countInstallment}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Add);
