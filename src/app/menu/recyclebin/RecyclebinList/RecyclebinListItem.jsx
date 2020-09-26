import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { format, parseISO } from "date-fns";
// import { arrKeyValue } from "../../../../common/helpers/objectHelpers";

class RecyclebinListItem extends Component {
  render() {
    const { 
      // user, 
      // roles, 
      // index, 
      loading, 
      // aS, 
    } = this.props;
    // let setRoles;
    // const arrRoles =
    //   user.arrRoles && user.arrRoles.toString().length > 0
    //     ? user.arrRoles.toString().split(",")
    //     : [];
    // const initRoles = arrKeyValue(roles, arrRoles, "id", "roleName");
    // if (arrRoles[0]) {
    //   arrRoles.forEach((role) => {
    //     if (role === "SA") {
    //       initRoles.push("Superadmin");
    //     }
    //   });
    // }
    // setRoles = initRoles.map((role) => (
    //   <span
    //     key={role}
    //     className="tag is-warning"
    //     style={initRoles.length > 1 ? { marginRight: 5, marginBottom: 3 } : { marginRight: 5 }}
    //   >
    //     {role}
    //   </span>
    // ));
    if (loading)
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    return (
      <tr>
        <td className="has-text-centered">
          {/* {index + 1} */}
          </td>
        <td>
          {/* {user.email} */}
          </td>
        <td className="is-capitalized has-text-centered">
          {/* {user.profile.name} */}
        </td>
        <td className="has-text-centered">
          {/* {setRoles.toString().length > 0 ? setRoles : ""} */}
        </td>
        <td className="has-text-centered">
          {/* {user.createdAt &&
            format(parseISO(user.createdAt), "d LLLL yyyy hh:mm:aa")} */}
        </td>
        <td className="has-text-centered">
          {/* <div className="buttons">
            {aS.v === true && (
              <Link
                to={`/users-management/users/view/${user.id}`}
                className="button is-small is-rounded is-primary is-outlined"
              >
                View
              </Link>
            )}
            {aS.u === true && (
              <Link
                to={`/users-management/users/edit/${user.id}`}
                className="button is-small is-rounded is-primary is-outlined"
              >
                Edit
              </Link>
            )}
            {aS.d === true && (
              <button className="button is-small is-rounded is-danger is-outlined">
                Delete
              </button>
            )}
          </div> */}
        </td>
      </tr>
    );
  }
}

export default RecyclebinListItem;
