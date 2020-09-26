import React, { Component } from "react";
import { Fragment } from "react";
import { arrKeyValue } from "../../../common/helpers/objectHelpers";

class UserFormViewRole extends Component {
  render() {
    const { user, roles } = this.props;
    let setRoles;
    const arrRoles = user.arrRoles.toString().length > 0 ? user.arrRoles.toString().split(",") : [];
    const initRoles = arrKeyValue(roles, arrRoles, "id", "roleName");
    if (arrRoles && arrRoles[0]) {
      arrRoles.forEach((role) => {
        if(role === "SA") {
          initRoles.push("Superadmin");
        }
      })
    }
    setRoles = initRoles.map((role) => (
      <span
        key={role}
        className="tag is-warning"
        style={{ marginRight: 5, marginBottom: 3 }}
      >
        {role}
      </span>
    ));
    return (
      <Fragment>
        <div className="columns">
          <div className="column is-full">
            <h3 className="has-text-weight-bold">Role</h3>
            <div className="view">
              <p className="is-capitalized">
                {setRoles.toString().length > 0 ? setRoles : "-"}
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserFormViewRole;
