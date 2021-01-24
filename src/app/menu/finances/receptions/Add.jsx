import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../modals/redux/modalActions';
import { receptionAdd } from './redux/reduxApi';
import { accountsIndex } from '../../accountings/accounts/redux/reduxApi';
import AddForm from './AddForm';

const mapState = (state) => ({
  loading: state.async.loading,
  auth: state.auth,
  accounts: state.accounts,
});

const actions = {
  closeModal,
  receptionAdd,
  accountsIndex,
};

class Add extends Component {
  state = {
    tl: 'penerimaan',
    initialValues: {},
    sum: '',
    unit: '',
    total: '',
  };

  componentDidMount = () => {
    const { accountsIndex, auth } = this.props;
    accountsIndex(auth.token, '');
  };

  onFormSubmit = (values) => {
    const { auth, receptionAdd, data, accounts } = this.props;
    values.receptionTotal = Number(values.receptionSum * values.receptionUnit);
    for (let index = 0; index < accounts.length; index++) {
      if (accounts[index].code === values.accountCode) {
        values.accountName = accounts[index].name;
      }
      
    }
    try {
      receptionAdd(values, auth, data.total);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { loading, accounts, closeModal } = this.props;
    const { tl, initialValues } = this.state;
    initialValues.date = new Date();
    initialValues.receptionUnit = 1;
    let accountsOpt = [];
    for (let index = 0; index < accounts.length; index++) {
      if (accounts[index].headerDetail === 'Detail') {
        accountsOpt.push({
          key: accounts[index].code,
          text: `${accounts[index].code} - ${accounts[index].name}`,
          value: accounts[index].code,
        });
      }
    }
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger py-4'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-size-6 is-capitalized'>
              <i className='fas fa-file-invoice-dollar icon mr-1' />
              Tambah {tl}
            </div>
          </header>
          <AddForm
            initialValues={initialValues}
            onFormSubmit={this.onFormSubmit}
            closeModal={closeModal}
            loading={loading}
            accounts={accountsOpt}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Add);
