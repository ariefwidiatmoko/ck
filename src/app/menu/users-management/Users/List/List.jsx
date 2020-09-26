import React, { Component, Fragment } from 'react';
import UserListItem from './Item';

class List extends Component {
  render() {
    const { users, roles, cp, itn, loading, aS, onDelete } = this.props;
    return (
      <Fragment>
        {users &&
          users.length !== 0 &&
          users.map((user, index) => (
            <UserListItem
              key={user.id}
              index={index}
              user={user}
              cp={cp}
              itn={itn}
              roles={roles}
              loading={loading}
              aS={aS}
              onDelete={onDelete}
            />
          ))}
        {users && users.length === 0 && (
          <tr>
            <td colSpan='5'>Tidak Ada User</td>
          </tr>
        )}
      </Fragment>
    );
  }
}

export default List;
