import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  hasLengthLessThan,
} from "revalidate";
import TextInput from "../../../common/form/TextInput";

const validate = combineValidators({
  roleName: composeValidators(
    isRequired({ message: "Role name is required" }),
    hasLengthGreaterThan(2)({
      message: "Role name is at least 3 characters ",
    }),
    hasLengthLessThan(20)({ message: "Role name is at max 20 characters " })
  )(),
});

class RoleFormInput extends Component {
  state = this.props.dataState();

  componentDidMount = () => {
    const { role, roleId } = this.props;
    if (roleId) {
      let setA = JSON.parse(role.arrAuthorities);
      const roleData = {
        roleId: role.id,
        roleName: role.roleName,
        m: setA[0],
        subm: setA[1],
        createdBy: role.createdBy,
        editedBy: role.editedBy,
      };
      roleData.m.forEach((m) => {
        this.setState({
          [m.id]: m.v,
          [m.id + "_c"]: m.c,
          [m.id + "_u"]: m.u,
          [m.id + "_d"]: m.d,
        });
      });
      roleData.subm.forEach((subm) => {
        this.setState({
          [subm.id]: subm.v,
          [subm.id + "_c"]: subm.c,
          [subm.id + "_u"]: subm.u,
          [subm.id + "_d"]: subm.d,
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
    const { auth, roleNew, roleEdit, history, roleId } = this.props;
    const { dataM, dataSubm, dataAc } = this.state;
    let setM = [];
    let setSubm = [];
    dataM.forEach((m) => {
      if (this.state[m] === true) {
        let c;
        let u;
        let d;
        c = this.state[m + "_c"] === undefined ? false : this.state[m + "_c"];
        u = this.state[m + "_u"] === undefined ? false : this.state[m + "_u"];
        d = this.state[m + "_d"] === undefined ? false : this.state[m + "_d"];
        setM.push({ id: m, v: true, c: c, u: u, d: d });
      } else {
        setM.push({ id: m, v: false, c: false, u: false, d: false });
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
        });
      } else {
        setSubm.push({
          id: subm,
          v: false,
          c: false,
          u: false,
          d: false,
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
      let arr1 = newArr[i].split("_");
      merge.push({ id: arr1[0] + "", v: true, [arr1[1] + ""]: true });
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
                },
                b
              )
            ),
          new Map()
        )
        .values(),
    ];
    if (roleId) {
      roleEdit(roleId, values.roleName, setM, setAc, auth, history);
    } else {
      roleNew(values.roleName, setM, setAc, auth, history);
    }
  };

  render() {
    const { handleSubmit, history, loading, menus, roleId, role, Link } = this.props;
    return (
      <Fragment>
        <div className="box">
          <form
            onSubmit={handleSubmit(this.handleClickSubmit)}
            autoComplete="off"
            className="margin-9"
          >
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <nav className="breadcrumb is-size-7" aria-label="breadcrumbs">
                    <ul className="margin-10-25">
                      <li>
                        <Link to="/pengaturan-user/role">Role</Link>
                      </li>
                      <li className="is-active is-capitalized">
                        <Link to={`/pengaturan-user/role`}>
                          {roleId && role ? "Edit" : "Tambah"}
                        </Link>
                      </li>
                      {roleId && role && (
                        <li className="is-active is-capitalized">
                          <Link to={`/pengaturan-user/role`}>
                            {role.roleName}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <div className="buttons" style={{ marginBottom: 10 }}>
                    <span
                      onClick={() => history.push("/pengaturan-user/role")}
                      disabled={loading}
                      className="button custom-grey is-small is-rounded is-outlined"
                    >
                    <i className="fas fa-arrow-left icon" />
                    </span>
                    <button
                      type="submit"
                      disabled={loading}
                      className={
                        loading
                          ? "button is-small is-primary is-rounded is-outlined is-loading"
                          : "button is-small is-primary is-rounded is-outlined"
                      }
                    >
                    <i className="fas fa-save icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Field
              label="Nama Role"
              name="roleName"
              type="text"
              component={TextInput}
              placeholder="Nama Role"
            />
          </form>
          <table
            className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            style={{ marginTop: 15 }}
          >
            <thead>
              <tr>
                <th className="has-text-centered">No</th>
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
                          className="has-text-centered"
                          style={{ marginTop: 15 }}
                        >
                          {1 + i++}
                        </p>
                      </td>
                      <td>
                        <div className="field" style={{ marginLeft: 20 }}>
                          <div className="control">
                            <label className="custom-checkbox">
                              Lihat Menu {m.title}
                              <input
                                name={m.alias}
                                type="checkbox"
                                checked={this.state[m.alias]}
                                onChange={(event) => this.handleInput(event)}
                              />
                              <span className="checkmark" />
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
                            <div className="field" style={{ marginLeft: 70 }}>
                              <div className="control">
                                <label className="custom-checkbox">
                                  Akses Tambah pada Menu {m.title}
                                  <input
                                    name={m.alias + "_c"}
                                    type="checkbox"
                                    checked={this.state[m.alias + "_c"]}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className="field" style={{ marginLeft: 70 }}>
                              <div className="control">
                                <label className="custom-checkbox">
                                  Akses Update pada Menu {m.title}
                                  <input
                                    name={m.alias + "_u"}
                                    type="checkbox"
                                    checked={this.state[m.alias + "_u"]}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div className="field" style={{ marginLeft: 70 }}>
                              <div className="control">
                                <label className="custom-checkbox">
                                  Akses Hapus pada Menu {m.title}
                                  <input
                                    name={m.alias + "_d"}
                                    type="checkbox"
                                    checked={this.state[m.alias + "_d"]}
                                    onChange={(event) =>
                                      this.handleInput(event)
                                    }
                                  />
                                  <span className="checkmark" />
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
                              <div className="field" style={{ marginLeft: 70 }}>
                                <div className="control">
                                  <label className="custom-checkbox">
                                    Lihat Submenu {subm.submenuTitle}
                                    <input
                                      name={subm.id}
                                      type="checkbox"
                                      checked={this.state[subm.id]}
                                      onChange={(event) =>
                                        this.handleInput(event)
                                      }
                                    />
                                    <span className="checkmark" />
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
                                    className="field"
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className="control">
                                      <label className="custom-checkbox">
                                        Akses Tambah pada Submenu{" "}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + "_c"}
                                          type="checkbox"
                                          checked={this.state[subm.id + "_c"]}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className="checkmark" />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className="field"
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className="control">
                                      <label className="custom-checkbox">
                                        Akses Update pada Submenu{" "}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + "_u"}
                                          type="checkbox"
                                          checked={this.state[subm.id + "_u"]}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className="checkmark" />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <div
                                    className="field"
                                    style={{ marginLeft: 110 }}
                                  >
                                    <div className="control">
                                      <label className="custom-checkbox">
                                        Akses Hapus pada Submenu{" "}
                                        {subm.submenuTitle}
                                        <input
                                          name={subm.id + "_d"}
                                          type="checkbox"
                                          checked={this.state[subm.id + "_d"]}
                                          onChange={(event) =>
                                            this.handleInput(event)
                                          }
                                        />
                                        <span className="checkmark" />
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
      </Fragment>
    );
  }
}

export default reduxForm({
  form: "roleForm",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(RoleFormInput);
