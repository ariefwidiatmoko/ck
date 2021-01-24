import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NUM_ALPHABET } from '../../../common/helpers/optionHelpers';
import { memberAdd, memberEdit, memberView } from './redux/reduxApi';
import { customAlphabet } from 'nanoid';
import CreateEdit from './CreateEdit';
import {yearMonth} from '../../../common/helpers/othersHelpers';

const mapState = (state, ownProps) => {
  const ym = yearMonth();
  const code = customAlphabet(NUM_ALPHABET, 5);
  const memberId = ownProps.match.params.id;
  let member;
  if (!memberId) {
    member = {
      code: ym + '-' + code(),
      joinDate: new Date(),
    };
  } else {
    if (state.members && state.members.length > 0) {
      member = state.members.filter((member) => member.code === memberId)[0];
    }
  }
  return {
    member: member,
    loading: state.async.loading,
    auth: state.auth,
  };
};

const actions = {
  memberAdd,
  memberEdit,
  memberView,
};

class Form extends Component {
  _isMounted = false;
  state = {
    memberId: this.props.match.params.id,
    toggle: false,
  };

  componentDidMount = () => {
    this._isMounted = true;
    const { auth, memberView } = this.props;
    const { memberId } = this.state;
    if (memberId) {
      memberView(memberId, auth);
    }
    setTimeout(() => {
      this.updateInitialValues();
      this.handleToggle();
    }, 200);
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  updateInitialValues = () => {
    const { member } = this.props;
    const setInitialValues = { ...member };
    if (this._isMounted) {
      this.setState({
        initialValues: setInitialValues,
      });
    }
  };

  handleToggle = (e) => {
    const { member } = this.props;
    const setOther = e && e.target.value === 'Other' ? true : false;
    const initReligion = member && member.religion === 'Other' ? true : false;
    let setToggle;
    if (initReligion === true && !e) {
      setToggle = true;
    } else if (initReligion === true && e && setOther === true) {
      setToggle = true;
    } else if (initReligion === false && e && setOther === true) {
      setToggle = true;
    } else {
      setToggle = false;
    }
    this.setState({
      toggle: setToggle,
    });
  };

  onFormSubmit = async (values) => {
    const { auth, history, memberAdd, memberEdit } = this.props;
    const { memberId } = this.state;
    if (!memberId) {
      try {
        await memberAdd(values, auth, history);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (values.religion !== null && values.religion !== 'Other') {
          values.religionDetail = null;
        }
        await memberEdit(values, auth, memberId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { history } = this.props;
    const { initialValues, memberId, toggle } = this.state;
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
                            <Link to='/keanggotaan/anggota'>Anggota</Link>
                          </li>
                          <li className='is-active'>
                            <Link
                              to={
                                memberId
                                  ? `/keanggotaan/anggota/edit/${memberId}`
                                  : `/keanggotaan/anggota/tambah`
                              }
                            >
                              {memberId ? 'Edit' : 'Tambah'}
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
                          type='button'
                          onClick={this.props.history.goBack}
                          className='button custom-grey is-small is-rounded is-outlined'
                        >
                          <i className='fas fa-arrow-left icon' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='columns'>
                  <div className='column is-third-quarter'>
                    <CreateEdit
                      initialValues={initialValues}
                      memberId={memberId}
                      history={history}
                      toggle={toggle}
                      onFormSubmit={this.onFormSubmit}
                      handleToggle={this.handleToggle}
                    />
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
