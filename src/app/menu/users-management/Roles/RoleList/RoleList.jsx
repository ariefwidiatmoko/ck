import React, { Component, Fragment } from "react";
import RoleListItem from "./RoleListItem";
import { objectToArray } from "../../../../common/helpers/objectHelpers";

class RoleList extends Component {
  render() {
    const { roles, loading, aS } = this.props;
    return (
      <Fragment>
        {roles && roles.length === 0 && (
          <tr>
            <td colSpan="4">Tidak Ada Role</td>
          </tr>
        )}
        {roles &&
          roles.length !== 0 &&
          objectToArray(roles).map((role, index) => (
            <RoleListItem
              key={role.id}
              index={index}
              role={role}
              loading={loading}
              aS={aS}
            />
          ))}
      </Fragment>
    );
  }
}

export default RoleList;
