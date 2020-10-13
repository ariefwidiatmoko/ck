import React, { Component, Fragment } from 'react';
import Item from './Item';

class Lists extends Component {
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
        <Item
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

export default Lists;
