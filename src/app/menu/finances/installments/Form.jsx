import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { installmentView, installmentAdd } from './redux/reduxApi';
import { Profilecard } from '../../../common/components/Profilecard';
import background from '../../../../images/default-background.jpg';
import FormTab from './FormTab';
import FormInstallment from './FormInstallment';
import profileDefault from '../../../../images/user-default.png';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import { reset } from 'redux-form';
import TableInstallment from './TableInstallment';

const mapState = (state, ownProps) => {
  const id = ownProps.match.params.id;

  let aS = {};
  if (state.auth) {
    aS = state.auth.arrAuth.detail.subm.filter((i) => i.id === 'angsuran')[0];
  }

  let installment = {};
  if (state.installments && state.installments.length > 0) {
    installment = state.installments.filter((item) => item.loanCode === id)[0];
  }

  return {
    id: id,
    auth: state.auth,
    aS: aS,
    loading: state.async.loading,
    installment: installment,
  };
};

const actions = {
  installmentView,
  installmentAdd,
  reset,
};

class Form extends Component {
  state = {
    tl: 'Angsuran',
    open: true,
    activeTab: 'basic',
  };

  componentDidMount = () => {
    const { id, auth, installmentView } = this.props;
    installmentView(id, auth);
  };

  OnChangeActiveTab = (activeTab) => {
    this.setState({
      activeTab: activeTab,
    });
  };

  onFormSubmit = (values) => {
    const { auth, installment, installmentAdd } = this.props;
    values.installmentNum =
      installment.loanPayment !== null
        ? JSON.parse(installment.loanPayment).length > 0
          ? JSON.parse(installment.loanPayment).length + 1
          : 1
        : 1;
    try {
      installmentAdd(values, auth);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { id, installment, loading, history, reset, aS } = this.props;
    const { tl } = this.state;
    const profile = installment.profile;
    installment.installmentDate = new Date();
    installment.loanPaid =
      installment.loanPaid !== null ? Number(installment.loanPaid) : 0;
    installment.loanLeft =
      installment.loanLeft !== null
        ? installment.loanLeft
        : installment.sumTotal;
    installment.installmentSum = installment.loanLeft > installment.installmentFix ? installment.installmentFix : installment.loanLeft;
    const loanPayment =
      installment.loanPayment !== null
        ? JSON.parse(installment.loanPayment).length > 0
          ? JSON.parse(installment.loanPayment)
          : []
        : [];
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
                        <ul className='margin-10-25'>
                          <li>
                            <Link to='/keuangan/angsuran'>{tl}</Link>
                          </li>
                          <li className='is-active'>
                            <Link to={`/keuangan/angsuran/${id}`}>Detail</Link>
                          </li>
                          <li className='is-active'>
                            <Link to={`/keuangan/angsuran/${id}`}>
                              {profile.name}
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      <div className='buttons'>
                        <button
                          onClick={() => history.goBack()}
                          className='button custom-grey is-small is-rounded is-outlined'
                        >
                          <i className='fas fa-arrow-left icon' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='columns'>
                  <div className='column is-3-desktop is-12-mobile'>
                    <Profilecard
                      background={background}
                      profileDefault={profileDefault}
                      auth={{
                        name: profile ? profile.name : '',
                        username: profile ? profile.code : '',
                      }}
                      profile={profile ? profile : ''}
                      link={SITE_ADDRESS}
                    />
                  </div>
                  <div className='column'>
                    <div className='box'>
                      <FormTab
                        onChangeActiveTab={this.OnChangeActiveTab}
                        activeTab={this.state.activeTab}
                        itemId={id}
                      />
                      {this.state.activeTab === 'basic' && (
                        <>
                          {installment && Number(installment.loanLeft) > 0 && (
                            <>
                              <FormInstallment
                                initialValues={{ ...installment, profile }}
                                loading={loading}
                                history={history}
                                reset={reset}
                                onFormSubmit={this.onFormSubmit}
                                onChangeActiveTab={this.onChangeActiveTab}
                              />
                              <hr />{' '}
                            </>
                          )}
                          <TableInstallment
                            aS={aS}
                            tl={tl}
                            loading={loading}
                            items={loanPayment}
                          />
                        </>
                      )}
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

export default withRouter(connect(mapState, actions)(Form));
