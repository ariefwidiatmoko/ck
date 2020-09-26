import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

class RoleListItem extends Component {
  render() {
    const { role, index, loading, aS } = this.props;
    if (loading)
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    return (
      <tr>
        <td className="has-text-centered">{index + 1}</td>
        <td className="is-capitalized has-text-centered">{role.roleName}</td>
        <td className="has-text-centered">
          {role.createdAt &&
            format(parseISO(role.createdAt), "d LLLL yyyy hh:mm:aa")}
        </td>
        <td className="has-text-centered">
          <div className="buttons">
            {aS.u === true && (
              <Link
                to={`/pengaturan-user/role/edit/${role.id}`}
                className="button is-small is-rounded is-primary is-outlined"
              >
                Edit
              </Link>
            )}
            {aS.d === true && (
              <button className="button is-small is-rounded is-danger is-outlined">
                Hapus
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default RoleListItem;
