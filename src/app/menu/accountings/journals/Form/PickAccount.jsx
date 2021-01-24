import React, { Component } from 'react';
import SimpleSearch from '../../../pages/_part/_fragment/SimpleSearch';
import { closeModal } from '../../../modals/redux/modalActions';
import { connect } from 'react-redux';
import { accountsIndex } from '../../accounts/redux/reduxApi';

const mapState = (state) => {
  return {
    loading: state.async.loading,
    accounts: state.accounts,
    auth: state.auth,
  };
};

const actions = {
  closeModal,
  accountsIndex,
};

class PickAccount extends Component {
  state = {
    tl: 'akun',
    st: '',
    elementId: null,
  };

  componentDidMount = () => {
    const { accountsIndex, auth } = this.props;
    const { st } = this.state;
    accountsIndex(auth.token, st);
  };

  handleSimpleSearch = (st) => {
    const { auth } = this.props;
    this.setState((prevState) => ({
      st: st,
    }));
    this.props.accountsIndex(auth.token, st);
  };

  onHover = (e, value) => {
    this.setState({
      hover: value,
      elementId: value === true ? e.target.dataset.id : null,
    });
  };

  render() {
    const { loading, closeModal, accounts, data } = this.props;
    const { tl, elementId } = this.state;
    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head is-danger py-4'>
            <div className='modal-card-title has-text-link has-text-weight-normal is-size-6'>
              <i className='fas fa-file-invoice-dollar icon mr-1' />
              Tambah Akun
            </div>
            <SimpleSearch
              tl={tl}
              loading={loading}
              onFormSubmit={this.handleSimpleSearch}
              autoFocus={true}
            />
          </header>
          <section className='modal-card-body is-size-6'>
            <div
              className='table-container'
              style={{ marginTop: -20, marginBottom: -7 }}
            >
              <table className='table is-fullwidth is-hoverable mb-1'>
                <thead>
                  <tr>
                    <th className='has-text-centered'>No</th>
                    <th className='has-text-centered'>Kode</th>
                    <th className='has-text-centered'>Nama</th>
                    <th className='has-text-centered'>Tipe</th>
                    <th className='has-text-centered'>Header/Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <Lists
                    items={accounts}
                    tl={tl}
                    loading={loading}
                    onSelectAccount={data.onSelectAccount}
                    selectedAccount={data.selectedAccount}
                    dK={data.dK}
                    onHover={this.onHover}
                    elementId={elementId}
                  />
                </tbody>
              </table>
            </div>
          </section>
          <footer className='modal-card-foot py-3'>
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

export default connect(mapState, actions)(PickAccount);

const Lists = ({
  loading,
  items,
  tl,
  onSelectAccount,
  selectedAccount,
  dK,
  onHover,
  elementId,
}) => {
  return (
    <>
      {items &&
        items.length !== 0 &&
        items.map((item, index) => (
          <Item
            key={item.code}
            index={index}
            item={item}
            loading={loading}
            onSelectAccount={onSelectAccount}
            selectedAccount={selectedAccount}
            dK={dK}
            onHover={onHover}
            elementId={elementId}
          />
        ))}
      {items && items.length === 0 && (
        <tr>
          <td colSpan='8' className='is-capitalized'>
            Tidak Ada data {tl}
          </td>
        </tr>
      )}
    </>
  );
};

const Item = (props) => {
  const { index, item, loading, onSelectAccount, selectedAccount, dK } = props;
  const rowDisable =
    selectedAccount.filter((i) => i.code === item.code).length !== 0
      ? true
      : false;
  if (loading)
    return (
      <tr>
        <td colSpan='5'>&nbsp;</td>
      </tr>
    );
  return (
    <>
      {rowDisable && (
        <tr disabled style={{backgroundColor: '#00d1b2'}}>
          <td className='has-text-centered'>{index + 1}</td>
          <td className='has-text-centered'>{item.code}</td>
          <td className='has-text-centered'>{item.name}</td>
          <td className='has-text-centered'>{item.type}</td>
          <td className='is-capitalized has-text-centered'>
            {item.headerDetail}
          </td>
        </tr>
      )}
      {!rowDisable && (
        <tr onClick={() => onSelectAccount({ ...item, dK: dK })}>
          <td className='has-text-centered'><div className="hand-pointer">{index + 1}</div></td>
          <td className='has-text-centered'><div className="hand-pointer">{item.code}</div></td>
          <td className='has-text-centered'><div className="hand-pointer">{item.name}</div></td>
          <td className='has-text-centered'><div className="hand-pointer">{item.type}</div></td>
          <td className='is-capitalized has-text-centered'>
          <div className="hand-pointer">{item.headerDetail}</div>
          </td>
        </tr>
      )}
    </>
  );
};
