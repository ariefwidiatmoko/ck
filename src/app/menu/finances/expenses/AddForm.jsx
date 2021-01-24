import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { savingAdd } from './redux/reduxApi';
import { membersIndex } from '../../membership/members/redux/reduxApi';
import FormSaving from './FormSaving';
import FormMember from './FormMember';
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
  savingAdd,
};

class AddForm extends Component {
  state = {
    tl: 'anggota',
    cp: 1,
    itn: 10,
    st: '',
    initialValues: {},
    hover: false,
    elementId: null,
    open: true,
  };

  componentDidMount = () => {
    const { auth, membersIndex } = this.props;
    membersIndex(auth.token, 10, 1, '');
  };

  onClose = (value) => {
    this.setState({
      open: false,
    });
    if (value === false) {
      this.props.closeModal();
    }
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
      initialValues: {...member, date: new Date()},
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

  onFormSubmit = (values) => {
    const { auth, savingAdd, data } = this.props;
    try {
      savingAdd(values, auth, data.total);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { detail, members, loading, closeModal, savingAdd } = this.props;
    const tt = detail && detail.total ? detail.total : 0;
    const { tl, cp, itn, initialValues, elementId } = this.state;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger py-4'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-size-6'>
              <i className='fas fa-file-invoice-dollar icon mr-1' />
              {initialValues !== undefined
                ? `Tambah Simpanan [${initialValues.code} - ${initialValues.name}]`
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
            <FormMember
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
            <FormSaving
              initialValues={initialValues}
              onFormSubmit={this.onFormSubmit}
              savingAdd={savingAdd}
              closeModal={closeModal}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(AddForm);
