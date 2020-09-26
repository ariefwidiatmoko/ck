import React, { Component, Fragment } from "react";
import RecyclebinListItem from "./RecyclebinListItem";

class RecyclebinList extends Component {
  render() {
    const { 
      // users, 
      // roles, 
      loading, 
      // aS, 
    } = this.props;
    return (
      <Fragment>
        {/* {users &&
          users.length !== 0 &&
          users.map((user, index) => ( */}
            <RecyclebinListItem
              // key={user.id}
              // index={index}
              // user={user}
              // roles={roles}
              loading={loading}
              // aS={aS}
            />
          {/* ))} */}
        {/* {users && users.length === 0 && (
           <tr>
           <td>No Item</td>
          </tr>
        )} */}
      </Fragment>
    );
  }
}

export default RecyclebinList;
