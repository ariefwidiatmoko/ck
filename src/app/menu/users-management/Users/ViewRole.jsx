import React from 'react';
import { arrKeyValue } from '../../../common/helpers/objectHelpers';

export default function ViewRole(props) {
  const { user, roles } = props;
  let setRoles;
  const allRoles =
    user.roles.toString().length > 0
      ? user.roles.toString().split(',')
      : [];
  const initRoles = arrKeyValue(roles, allRoles, 'id', 'name');
  if (allRoles && allRoles[0]) {
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
      style={{ marginRight: 5, marginBottom: 3 }}
    >
      {role}
    </span>
  ));
  return (
    <>
      <div className='columns'>
        <div className='column is-full'>
          <h3 className='has-text-weight-bold'>Role</h3>
          <div className='view'>
            <p className='is-capitalized'>
              {setRoles.toString().length > 0 ? setRoles : '-'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
