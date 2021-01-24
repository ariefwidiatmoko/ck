import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  hasLengthLessThan,
} from 'revalidate';
import TextInput from '../../../common/form/TextInput';

const validate = combineValidators({
  name: composeValidators(
    isRequired({ message: 'Nama role perlu diisi' }),
    hasLengthGreaterThan(2)({
      message: 'Nama role paling sedikit 3 karakter',
    }),
    hasLengthLessThan(21)({ message: 'Nama role paling banyak 20 karakter' })
  )(),
});

class FormInput extends Component {
  state = this.props.dataState();

  componentDidMount = () => {
    const { role, roleId } = this.props;
    if (roleId) {
      let setA = JSON.parse(role.authorities);
      const roleData = {
        roleId: role.id,
        name: role.name,
        m: setA[0],
        subm: setA[1],
        createdBy: role.createdBy,
        editedBy: role.editedBy,
      };
      roleData.m.forEach((m) => {
        this.setState({
          [m.id]: m.v,
          [m.id + '_c']: m.c,
          [m.id + '_u']: m.u,
          [m.id + '_d']: m.d,
          [m.id + '_r']: m.r,
          [m.id + '_h']: m.h,
          [m.id + '_e']: m.e,
          [m.id + '_i']: m.i,
        });
      });
      roleData.subm.forEach((subm) => {
        this.setState({
          [subm.id]: subm.v,
          [subm.id + '_c']: subm.c,
          [subm.id + '_u']: subm.u,
          [subm.id + '_d']: subm.d,
          [subm.id + '_r']: subm.r,
          [subm.id + '_h']: subm.h,
          [subm.id + '_e']: subm.e,
          [subm.id + '_i']: subm.i,
        });
      });
    }
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name],
    });
  };

  handleClickSubmit = (values) => {
    const { auth, roleAdd, roleEdit, history, roleId } = this.props;
    const { dataM, dataSubm, dataAc } = this.state;
    let setM = [];
    let setSubm = [];
    dataM.forEach((m) => {
      if (this.state[m] === true) {
        let c;
        let u;
        let d;
        let r;
        let h;
        let e;
        let i;
        c = this.state[m + '_c'] === undefined ? false : this.state[m + '_c'];
        u = this.state[m + '_u'] === undefined ? false : this.state[m + '_u'];
        d = this.state[m + '_d'] === undefined ? false : this.state[m + '_d'];
        r = this.state[m + '_r'] === undefined ? false : this.state[m + '_r'];
        h = this.state[m + '_h'] === undefined ? false : this.state[m + '_h'];
        e = this.state[m + '_e'] === undefined ? false : this.state[m + '_e'];
        i = this.state[m + '_i'] === undefined ? false : this.state[m + '_i'];
        setM.push({ id: m, v: true, c: c, u: u, d: d, r: r, h: h, e: e, i: i });
      } else {
        setM.push({
          id: m,
          v: false,
          c: false,
          u: false,
          d: false,
          r: false,
          h: false,
          e: false,
          i: false,
        });
      }
    });
    dataSubm.forEach((subm) => {
      if (this.state[subm] === true) {
        setSubm.push({
          id: subm,
          v: true,
          c: false,
          u: false,
          d: false,
          r: false,
          h: false,
          e: false,
          i: false,
        });
      } else {
        setSubm.push({
          id: subm,
          v: false,
          c: false,
          u: false,
          d: false,
          r: false,
          h: false,
          e: false,
          i: false,
        });
      }
    });
    let newArr = [];
    dataAc.forEach((ac) => {
      if (this.state[ac] === true) {
        newArr.push(ac);
      }
    });
    let merge = [...setSubm];
    for (let i = 0; i < newArr.length; i++) {
      let arr1 = newArr[i].split('_');
      merge.push({ id: arr1[0] + '', v: true, [arr1[1] + '']: true });
    }
    const setAc = [
      ...merge
        .reduce(
          (a, b) =>
            a.set(
              b.id,
              Object.assign(
                a.get(b.id) || {
                  id: false,
                  v: false,
                  c: false,
                  u: false,
                  d: false,
                  r: false,
                  h: false,
                  e: false,
                  i: false,
                },
                b
              )
            ),
          new Map()
        )
        .values(),
    ];
    if (roleId) {
      roleEdit(roleId, values.name, setM, setAc, auth, history);
    } else {
      roleAdd(values.name, setM, setAc, auth, history);
    }
  };

  render() {
    const {
      handleSubmit,
      history,
      loading,
      menus,
      roleId,
      role,
      Link,
    } = this.props;
    return (
      <Fragment>
        <div className='box'>
          <form
            onSubmit={handleSubmit(this.handleClickSubmit)}
            autoComplete='off'
            className='margin-9'
          >
            <div className='level'>
              <div className='level-left'>
                <div className='level-item'>
                  <nav
                    className='breadcrumb is-size-7'
                    aria-label='breadcrumbs'
                  >
                    <ul className='margin-10-25'>
                      <li>
                        <Link to='/pengaturan-user/role'>Role</Link>
                      </li>
                      <li className='is-active is-capitalized'>
                        <Link to={`/pengaturan-user/role`}>
                          {roleId && role ? 'Edit' : 'Tambah'}
                        </Link>
                      </li>
                      {roleId && role && (
                        <li className='is-active is-capitalized'>
                          <Link to={`/pengaturan-user/role`}>{role.name}</Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className='level-right'>
                <div className='level-item'>
                  <div className='buttons' style={{ marginBottom: 10 }}>
                    <span
                      onClick={() => history.push('/pengaturan-user/role')}
                      disabled={loading}
                      className='button custom-grey is-small is-rounded is-outlined'
                    >
                      <i className='fas fa-arrow-left icon' />
                    </span>
                    <button
                      type='submit'
                      disabled={loading}
                      className={
                        loading
                          ? 'button is-small is-primary is-rounded is-outlined is-loading'
                          : 'button is-small is-primary is-rounded is-outlined'
                      }
                    >
                      <i className='fas fa-save icon' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Field
              label='Nama Role'
              name='name'
              type='text'
              component={TextInput}
              placeholder='Nama Role'
            />
          </form>
          <table
            className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'
            style={{ marginTop: 15 }}
          >
            <thead>
              <tr>
                <th className='has-text-centered'>No</th>
                <th>
                  <p style={{ marginLeft: 20 }}>Detail Akses</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {menus &&
                menus.map((m, i) => (
                  <Fragment key={m.id}>
                    <tr>
                      <td>
                        <p
                          className='has-text-centered'
                          style={{ marginTop: 15 }}
                        >
                          {1 + i++}
                        </p>
                      </td>
                      <td>
                        <div className='field' style={{ marginLeft: 20 }}>
                          <div className='control'>
                            <label className='custom-checkbox'>
                              Lihat Menu {m.title}
                              <input
                                name={m.alias}
                                type='checkbox'
                                checked={this.state[m.alias]}
                                onChange={(event) => this.handleInput(event)}
                              />
                              <span className='checkmark' />
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {m.subm.length < 1 && this.state[m.id] === true && (
                      <Fragment>
                        <tr>
                          <td></td>
                          <td>
                            <div className='field' style={{ marginLeft: 70 }}>
                              <div className='control'>
                                <label className='custom-checkbox'>
                                  <i className='fas fa-plus icon' /> Akses
                                  Tambah Item pada Menu {m.title}
                                  <input
                                    name={m.alias + '_c'}
                                    type='checkbox'
                                    checked={this.state[m.alias + '_c']}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className='checkmark' />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className='field' style={{ marginLeft: 70 }}>
                              <div className='control'>
                                <label className='custom-checkbox'>
                                  <i className='fas fa-pen icon' /> Akses Update
                                  Item pada Menu {m.title}
                                  <input
                                    name={m.alias + '_u'}
                                    type='checkbox'
                                    checked={this.state[m.alias + '_u']}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className='checkmark' />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className='field' style={{ marginLeft: 70 }}>
                              <div className='control'>
                                <label className='custom-checkbox'>
                                  <i className='fas fa-trash-alt icon' /> Akses
                                  Hapus Item pada Menu {m.title}
                                  <input
                                    name={m.alias + '_d'}
                                    type='checkbox'
                                    checked={this.state[m.alias + '_d']}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className='checkmark' />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className='field' style={{ marginLeft: 70 }}>
                              <div className='control'>
                                <label className='custom-checkbox'>
                                  <i className='fas fa-trash-restore icon' />{' '}
                                  Akses Restore Item pada Menu {m.title}
                                  <input
                                    name={m.alias + '_r'}
                                    type='checkbox'
                                    checked={this.state[m.alias + '_r']}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className='checkmark' />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className='field' style={{ marginLeft: 70 }}>
                              <div className='control'>
                                <label className='custom-checkbox'>
                                  <i className='fas fa-times-circle icon' />{' '}
                                  Akses Hapus Selamanya Item pada Menu {m.title}
                                  <input
                                    name={m.alias + '_h'}
                                    type='checkbox'
                                    checked={this.state[m.alias + '_h']}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className='checkmark' />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className='field' style={{ marginLeft: 70 }}>
                              <div className='control'>
                                <label className='custom-checkbox'>
                                  <i className='fas fa-file-export icon' />{' '}
                                  Akses Ekspor Item pada Menu {m.title}
                                  <input
                                    name={m.alias + '_e'}
                                    type='checkbox'
                                    checked={this.state[m.alias + '_e']}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className='checkmark' />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className='field' style={{ marginLeft: 70 }}>
                              <div className='control'>
                                <label className='custom-checkbox'>
                                  <i className='fas fa-file-import icon' />{' '}
                                  Akses Impor Item pada Menu {m.title}
                                  <input
                                    name={m.alias + '_i'}
                                    type='checkbox'
                                    checked={this.state[m.alias + '_i']}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className='checkmark' />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    )}
                    {m.subm.length > 0 &&
                      this.state[m.id] === true &&
                      m.subm.map((subm) => (
                        <Fragment key={subm.id}>
                          <tr>
                            <td></td>
                            <td>
                              <div className='field' style={{ marginLeft: 70 }}>
                                <div className='control'>
                                  <label className='custom-checkbox'>
                                    Lihat Submenu {subm.submenuTitle}
                                    <input
                                      name={subm.id}
                                      type='checkbox'
                                      checked={this.state[subm.id]}
                                      onChange={(event) =>
                                        this.handleInput(event)
                                      }
                                    />
                                    <span className='checkmark' />
                                  </label>
                                </div>
                              </div>
                            </td>
                          </tr>
                          {this.state[subm.id] === true && (
                            <Fragment>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className='field'
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className='control'>
                                      <label className='custom-checkbox'>
                                        <i className='fas fa-plus icon' /> Akses
                                        Tambah Item pada Submenu{' '}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + '_c'}
                                          type='checkbox'
                                          checked={this.state[subm.id + '_c']}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className='field'
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className='control'>
                                      <label className='custom-checkbox'>
                                        <i className='fas fa-pen icon' /> Akses
                                        Update Item pada Submenu{' '}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + '_u'}
                                          type='checkbox'
                                          checked={this.state[subm.id + '_u']}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className='field'
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className='control'>
                                      <label className='custom-checkbox'>
                                        <i className='fas fa-trash-alt icon' />{' '}
                                        Akses Hapus Item pada Submenu{' '}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + '_d'}
                                          type='checkbox'
                                          checked={this.state[subm.id + '_d']}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className='field'
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className='control'>
                                      <label className='custom-checkbox'>
                                        <i className='fas fa-trash-restore icon' />{' '}
                                        Akses Restore Item pada Submenu{' '}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + '_r'}
                                          type='checkbox'
                                          checked={this.state[subm.id + '_r']}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className='field'
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className='control'>
                                      <label className='custom-checkbox'>
                                        <i className='fas fa-times-circle icon' />{' '}
                                        Akses Hapus Selamanya Item pada Submenu{' '}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + '_h'}
                                          type='checkbox'
                                          checked={this.state[subm.id + '_h']}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className='field'
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className='control'>
                                      <label className='custom-checkbox'>
                                        <i className='fas fa-file-export icon' />{' '}
                                        Akses Ekspor Item pada Submenu{' '}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + '_e'}
                                          type='checkbox'
                                          checked={this.state[subm.id + '_e']}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className='field'
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className='control'>
                                      <label className='custom-checkbox'>
                                        <i className='fas fa-file-import icon' />{' '}
                                        Akses Impor Item pada Submenu{' '}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + '_i'}
                                          type='checkbox'
                                          checked={this.state[subm.id + '_i']}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </Fragment>
                          )}
                        </Fragment>
                      ))}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
        <div className='box'>
          <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
            <thead>
              <tr>
                <th>Sistem Log</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Dibuat oleh <b>Admin</b> pada <b>12 Juli 2021 09:00:00</b></p>
                  <p>Diupdate oleh <b>Admin</b> pada <b>12 Juli 2021 09:00:00</b></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'roleForm',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(FormInput);
