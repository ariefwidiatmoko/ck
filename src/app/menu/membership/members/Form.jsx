import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import SelectInput from '../../../common/form/SelectInput';
import TextArea from '../../../common/form/TextArea';
import DateInput from '../../../common/form/DateInput';
import {
  activeStatus,
  gender,
  religion,
  maritalStatus,
  NUM_ALPHABET,
} from '../../../common/helpers/optionHelpers';
import { memberAdd, memberEdit, memberView } from './redux/reduxApi';
import { customAlphabet } from 'nanoid';

const mapState = (state, ownProps) => {
  const newDate = new Date();
  const code = customAlphabet(NUM_ALPHABET, 5);
  const year = newDate.getFullYear() + '';
  const yy = year.slice(2, 4);
  const month = newDate.getMonth() + 1 + '';
  const mm = month.length > 1 ? month : 0 + month;
  const memberId = ownProps.match.params.id;
  let member;
  if (!memberId) {
    member = {
      code: yy + mm + '-' + code(),
      joinDate: newDate,
    };
  } else {
    if (state.members && state.members.length > 0) {
      member = state.members.filter((member) => member.code === memberId)[0];
    }
  }
  return {
    member: member,
    initialValues: member,
    loading: state.async.loading,
    auth: state.auth,
  };
};

const actions = {
  memberAdd,
  memberEdit,
  memberView,
};

const validate = combineValidators({
  code: composeValidators(
    isRequired({ message: 'No Anggota harus diisi' }),
    hasLengthGreaterThan(9)({
      message: 'No Anggota harus memiliki paling sedikit 10 karakter',
    })
  )(),
  name: composeValidators(
    isRequired({ message: 'Panggilan harus diisi' }),
    hasLengthGreaterThan(1)({
      message: 'Panggilan harus memiliki paling sedikit 2 karakter',
    })
  )(),
  joinDate: isRequired({ message: 'Tanggal bergabung harus diisi' }),
});

class Form extends Component {
  state = {
    memberId: this.props.match.params.id,
    toggle: false,
  };

  componentDidMount = () => {
    const { auth, memberView } = this.props;
    const { memberId } = this.state;
    if (memberId) {
      memberView(memberId, auth);
    }
    this.handleToggle();
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
    const { history, invalid, loading, pristine } = this.props;
    const { memberId, toggle } = this.state;
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
                          disabled={invalid || loading || pristine}
                          onClick={this.props.handleSubmit(this.onFormSubmit)}
                          className={
                            loading
                              ? 'button is-small is-primary is-rounded is-outlined is-loading'
                              : 'button is-small is-primary is-rounded is-outlined'
                          }
                        >
                          <i className='fas fa-save icon' />
                        </button>
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
                    <form
                      onSubmit={this.props.handleSubmit(this.onFormSubmit)}
                      autoComplete='off'
                    >
                      <div className='field is-horizontal'>
                        <div className='field-body'>
                          <Field
                            label='No Anggota'
                            name='code'
                            placeholder='No Anggota'
                            type='text'
                            disabled
                            component={TextInput}
                          />
                          <Field
                            label='Tanggal Bergabung'
                            name='joinDate'
                            placeholder='YYYY/MM/DD'
                            type='date'
                            component={DateInput}
                            showMonthDropdown
                            showYearDropdown
                            defaultSelected={new Date()}
                            fullwidth={true}
                          />
                          <Field
                            label='Status Anggota'
                            name='activeStatus'
                            placeholder='Status Anggota'
                            type='text'
                            component={SelectInput}
                            options={activeStatus}
                            fullwidth={true}
                          />
                        </div>
                      </div>
                      <div className='field is-horizontal'>
                        <div className='field-body'>
                          <Field
                            label='Panggilan'
                            name='name'
                            type='text'
                            component={TextInput}
                            placeholder='Panggilan'
                            className='is-expanded'
                          />
                          <Field
                            label='Nama Lengkap'
                            name='fullname'
                            type='text'
                            component={TextInput}
                            placeholder='Nama Lengkap'
                            className='is-expanded'
                          />
                        </div>
                      </div>
                      <div className='field is-horizontal'>
                        <div className='field-body'>
                          <Field
                            name='phone'
                            type='text'
                            component={TextInput}
                            placeholder='Nomer Telepon'
                            label='Nomer Telepon'
                          />
                          <Field
                            label='Jenis Kelamin'
                            name='gender'
                            type='text'
                            component={SelectInput}
                            placeholder='Jenis Kelamin'
                            options={gender}
                            fullwidth={true}
                          />
                        </div>
                      </div>
                      <div className='field is-horizontal'>
                        <div className='field-body'>
                          <Field
                            label='Tempat Lahir'
                            name='pob'
                            type='text'
                            component={TextInput}
                            placeholder='Tempat Lahir'
                            className='is-expanded'
                          />
                          <Field
                            label='Tanggal Lahir'
                            name='dob'
                            type='date'
                            component={DateInput}
                            placeholder='YYYY/MM/DD'
                            showMonthDropdown
                            showYearDropdown
                            defaultSelected={null}
                            fullwidth={true}
                          />
                        </div>
                      </div>
                      <div className='field is-horizontal'>
                        <div className='field-body'>
                          <Field
                            label='Agama'
                            name='religion'
                            type='text'
                            component={SelectInput}
                            placeholder='Pilih Agama'
                            options={religion}
                            onChange={this.handleToggle}
                            fullwidth={true}
                          />
                          {toggle === true && (
                            <Field
                              label='Detail'
                              name='religionDetail'
                              type='text'
                              component={TextInput}
                              placeholder='Detail'
                            />
                          )}
                        </div>
                      </div>
                      <div className='field is-horizontal'>
                        <div className='field-body'>
                          <Field
                            label='Status Kawin'
                            name='maritalStatus'
                            type='text'
                            component={SelectInput}
                            placeholder='Status Kawin'
                            options={maritalStatus}
                            fullwidth={true}
                          />
                          <Field
                            label='Pekerjaan'
                            name='occupation'
                            type='text'
                            component={TextInput}
                            placeholder='Pekerjaan'
                          />
                        </div>
                      </div>
                      <Field
                        name='address'
                        type='text'
                        component={TextArea}
                        placeholder='Alamat'
                        label='Alamat'
                      />
                      <div
                        className='field is-grouped'
                        style={{ marginTop: 20, marginBottom: 20 }}
                      >
                        <div className='control'>
                          <button
                            type='submit'
                            disabled={invalid || loading || pristine}
                            className={
                              loading
                                ? 'button is-primary is-small is-rounded is-outlined is-loading'
                                : 'button is-primary is-small is-rounded is-outlined'
                            }
                          >
                            <i className='fas fa-save icon' />
                          </button>
                        </div>
                        <div className='control'>
                          <button
                            type='button'
                            onClick={() => history.goBack()}
                            className='button custom-grey is-small is-rounded is-outlined'
                          >
                            <i className='fas fa-arrow-left icon' />
                          </button>
                        </div>
                      </div>
                    </form>
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

export default withRouter(
  connect(
    mapState,
    actions
  )(reduxForm({ form: 'memberFormCreate', validate })(Form))
);
