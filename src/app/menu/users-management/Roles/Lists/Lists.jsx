import React, { Component, Fragment } from 'react';
import Item from './Item';
import { objectToArray } from '../../../../common/helpers/objectHelpers';

class Lists extends Component {
  render() {
    const { roles, loading, aS } = this.props;
    return (
      <Fragment>
        {roles && roles.length === 0 && (
          <tr>
            <td colSpan='4'>Tidak Ada Role</td>
          </tr>
        )}
        {roles &&
          roles.length !== 0 &&
          objectToArray(roles).map((role, index) => (
            <Item
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

export default Lists;
