import React from 'react';

export default function SetListsItem(props) {
  const { item, cp, itn, index, loading, aS, onSet } = props;
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
      <td className='has-text-centered'>{item.code}</td>
      <td className='is-capitalized has-text-centered'>{item.fullname}</td>
      <td className='has-text-centered'>
        <input
          name={item.code}
          type='checkbox'
          checked={item.activeStatus === true ? 'checked' : ''}
          readOnly
        />
      </td>
      <td className='has-text-centered'>
        <div>
          {aS.u === true && (
            <button
              className='button is-small is-info is-rounded is-outlined'
              aria-haspopup='true'
              aria-controls='dropdown-menu'
              onClick={() => onSet(item)}
            >
              Set Pengawas
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
