import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { arrKeyValue } from '../../../../common/helpers/objectHelpers';

class Item extends Component {
  render() {
    const { user, cp, itn, roles, index, loading, aS, onDelete } = this.props;
    let setRoles;
    const arrRoles =
      user.arrRoles && user.arrRoles.toString().length > 0
        ? user.arrRoles.toString().split(',')
        : [];
    const initRoles = arrKeyValue(roles, arrRoles, 'id', 'roleName');
    if (arrRoles[0]) {
      arrRoles.forEach((role) => {
        if (role === 'SA') {
          initRoles.push('Superadmin');
        }
      });
    }
    setRoles = initRoles.map((role) => (
      <span
        key={role}
        className='tag is-warning'
        style={
          initRoles.length > 1
            ? { marginRight: 5, marginBottom: 3 }
            : { marginRight: 5 }
        }
      >
        {role}
      </span>
    ));
    if (loading)
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    const pg = (cp - 1) * itn;
    return (
      <tr>
        <td className='has-text-centered'>{pg + index + 1}</td>
        <td>{user.username}</td>
        <td className='is-capitalized has-text-centered'>
          {user.profile.name}
        </td>
        <td className='has-text-centered'>
          {setRoles.toString().length > 0 ? setRoles : ''}
        </td>
        <td className='has-text-centered'>
          {user.createdAt &&
            format(parseISO(user.createdAt), 'd LLLL yyyy hh:mm:aa')}
        </td>
        <td className='has-text-centered'>
          <div className='buttons'>
            {aS.v === true && (
              <Link
                to={`/pengaturan-user/user/detail/${user.id}`}
                className='button is-small is-rounded is-primary is-outlined'
              >
                <i className='fas fa-eye icon' />
              </Link>
            )}
            {aS.u === true && (
              <Link
                to={`/pengaturan-user/user/edit/${user.id}`}
                className='button is-small is-rounded is-primary is-outlined'
              >
                <i className='fas fa-pen icon' />
              </Link>
            )}
            {aS.d === true && (
              <button
                className='button is-small is-rounded is-danger is-outlined'
                onClick={() => onDelete(user.id, user.username)}
              >
                <i className='fas fa-trash-alt icon' />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default Item;
