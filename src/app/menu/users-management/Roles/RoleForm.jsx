import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { roleNew, roleEdit } from "./redux/rolesApi";
import RoleFormInput from "./RoleFormInput";

const mapState = (state, ownProps) => {
  const roleId = ownProps.match.params.id;
  let role = {};

  if (state.roles && state.roles.length > 0) {
    role = state.roles.filter((role) => role.id === Number(roleId))[0];
  }
  return {
    menus: state.menus,
    auth: state.auth,
    role: role,
    loading: state.async.loading,
  };
};

const actions = {
  roleNew,
  roleEdit,
};

class RoleForm extends Component {
  state = {
    roleId: this.props.match.params.id,
  };

  objFn = () => {
    const { menus } = this.props;
    let dataState = {};
    const dataM = [];
    const dataSubm = [];
    const dataAc = [];
    menus.forEach((m) => {
      dataState[m.id] = false;
      dataM.push(m.id);
      if (m.subm.length > 0) {
        m.subm.forEach((subm) => {
          let dataState1 = { [subm.id]: false };
          let dataState2 = { [subm.id + "_c"]: false };
          let dataState3 = { [subm.id + "_u"]: false };
          let dataState4 = { [subm.id + "_d"]: false };
          dataState = {
            ...dataState,
            ...dataState1,
            ...dataState2,
            ...dataState3,
            ...dataState4,
          };
          dataSubm.push(subm.id);
          dataAc.push(subm.id + "_c");
          dataAc.push(subm.id + "_u");
          dataAc.push(subm.id + "_d");
        });
      } else {
        let dataState5 = { [m.id]: false };
        let dataState6 = { [m.id + "_c"]: false };
        let dataState7 = { [m.id + "_u"]: false };
        let dataState8 = { [m.id + "_d"]: false };
        dataState = {
          ...dataState,
          ...dataState5,
          ...dataState6,
          ...dataState7,
          ...dataState8,
        };
      }
    });
    dataState.roleName = null;
    dataState.dataM = dataM;
    dataState.dataSubm = dataSubm;
    dataState.dataAc = dataAc;
    return dataState;
  };

  render() {
    const {
      auth,
      menus,
      history,
      roleNew,
      roleEdit,
      loading,
      role,
    } = this.props;
    const { roleId } = this.state;
    return (
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable">
            <div className="column is-fullwidth">
              <RoleFormInput
                Link={Link}
                auth={auth}
                roleNew={roleNew}
                roleEdit={roleEdit}
                history={history}
                loading={loading}
                roleId={roleId}
                initialValues={roleId ? role : {}}
                role={role}
                menus={menus}
                dataState={this.objFn}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapState, actions)(RoleForm));
