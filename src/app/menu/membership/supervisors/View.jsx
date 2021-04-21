import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { supervisorView } from './redux/reduxApi';
import Tab from '../members/Tab';
import Info from '../members/Info';
import Photos from '../members/photos/Photos';
import Account from '../members/Account';
import background from '../../../../images/default-background.jpg';
import profileDefault from '../../../../images/user-default.png';
import { SITE_ADDRESS } from '../../../common/util/siteConfig';
import { Profilecard } from '../../../common/components/Profilecard';

const mapState = (state, ownProps) => {
  const supervisorId = ownProps.match.params.id;

  let aS = {};
  const auth = state.auth;
  if (auth && auth.authorities.details) {
    aS = auth.authorities.details.subm.filter((i) => i.id === 'badan-pengawas')[0];
  }

  let supervisor = {};
  if (state.supervisors && state.supervisors.length > 0) {
    supervisor = state.supervisors.filter((supervisor) => supervisor.code === supervisorId)[0];
  }
  return {
    auth: state.auth,
    aS: aS,
    supervisorId: supervisorId,
    supervisor: supervisor,
  };
};

const actions = {
  supervisorView,
};

class View extends Component {
  _isMounted = false;
  state = {
    tl: 'badan-pengawas',
    supervisorId: this.props.match.params.id,
    supervisor: this.props.supervisor,
    activeTab: 'basic',
  };

  componentDidMount = () => {
    const { supervisorId, auth, supervisorView } = this.props;
    supervisorView(supervisorId, auth);
  };

  OnChangeActiveTab = (activeTab) => {
    this.setState({
      activeTab: activeTab,
    });
  };

  render() {
    const { aS, auth, supervisor, history } = this.props;
    const { supervisorId, tl } = this.state;
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
                          <li className='is-capitalized'>
                            <Link to={'/keanggotaan/' + tl }>Badan Pengawas</Link>
                          </li>
                          <li className='is-active'>
                            <Link
                              to={`/keanggotaan/${tl}/detail/${supervisorId}`}
                            >
                              Detail
                            </Link>
                          </li>
                          <li className='is-active'>
                            <Link
                              to={`/keanggotaan/${tl}/detail/${supervisorId}`}
                            >
                              {supervisor.code}
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className='level-right'>
                    <div className='level-item'>
                      <div className='buttons'>
                        {aS.u === true && (
                          <Link
                            to={`/keanggotaan/${tl}/edit/${supervisorId}`}
                            className='button is-small is-primary is-rounded is-outlined'
                          >
                            <i className='fas fa-pen icon' />
                          </Link>
                        )}
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
                        name: supervisor ? supervisor.name : '',
                        code: supervisor ? supervisor.code : '',
                      }}
                      profile={supervisor ? supervisor : ''}
                      link={SITE_ADDRESS}
                    />
                  </div>
                  <div className='column'>
                    <div className='box'>
                      <Tab
                        onChangeActiveTab={this.OnChangeActiveTab}
                        activeTab={this.state.activeTab}
                        memberId={supervisorId}
                      />
                      {this.state.activeTab === 'basic' && (
                        <Info member={supervisor} />
                      )}
                      {this.state.activeTab === 'photo' && (
                        <Photos profile={supervisor} auth={auth} tl={tl} />
                      )}
                      {this.state.activeTab === 'account' && (
                        <Account member={supervisor} />
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

export default withRouter(connect(mapState, actions)(View));
