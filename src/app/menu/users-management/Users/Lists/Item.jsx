import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { arrKeyValue } from '../../../../common/helpers/objectHelpers';

export default function Item(props) {
  const {
    item,
    cp,
    itn,
    roles,
    index,
    loading,
    aS,
    onDelete,
    onRestore,
    onHDelete,
  } = props;
  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  let setRoles;
  const allRoles =
    item.roles && item.roles.toString().length > 0
      ? item.roles.toString().split(',')
      : [];
  const initRoles = arrKeyValue(roles, allRoles, 'id', 'name');
  if (allRoles[0]) {
    allRoles.forEach((role) => {
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
  const pg = (cp - 1) * itn;
  let logs = JSON.parse(item.logs);
  let cb = logs[0];
  let username = cb.user.username;
  return (
    <tr>
      <td className='has-text-centered'>{pg + index + 1}</td>
      <td className='has-text-centered'>{item.username}</td>
      <td className='is-capitalized has-text-centered'>{item.profile.name}</td>
      <td className='has-text-centered'>
        {setRoles.toString().length > 0 ? setRoles : ''}
      </td>
      <td className='has-text-centered'>
        {item.createdAt &&
          format(parseISO(item.createdAt), 'd LLLL yyyy - HH:mm:ss')}{' '}
        WIB
      </td>
      <td className='has-text-centered'>{username}</td>
      <td className='has-text-centered'>
        <div className='content-wrap'>
          {item.deletedAt === null && (
            <>
              {aS.v === true && (
                <Link
                  to={`/pengaturan-user/user/detail/${item.id}`}
                  className='button is-small is-rounded is-primary is-outlined mr-2 mb-1'
                >
                  <i className='fas fa-eye icon' />
                </Link>
              )}
              {aS.u === true && (
                <Link
                  to={`/pengaturan-user/user/edit/${item.id}`}
                  className='button is-small is-rounded is-primary is-outlined mr-2 mb-1'
                >
                  <i className='fas fa-pen icon' />
                </Link>
              )}
              {aS.d === true && (
                <button
                  className='button is-small is-rounded is-danger is-outlined mb-1'
                  onClick={() => onDelete(item)}
                >
                  <i className='fas fa-trash-alt icon' />
                </button>
              )}
            </>
          )}
          {item.deletedAt !== null && (
            <>
              {aS.r === true && (
                <button
                  className='button is-small is-rounded is-success is-outlined mr-1 mb-1'
                  onClick={() => onRestore(item)}
                >
                  <i className='fas fa-reply-all icon' />
                </button>
              )}
              {aS.h === true && (
                <button
                  className='button is-small is-rounded is-danger is-outlined mb-1'
                  onClick={() => onHDelete(item)}
                >
                  <i className='fas fa-times icon' />
                </button>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
