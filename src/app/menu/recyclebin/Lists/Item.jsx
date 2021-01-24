import React from 'react';
import { format, parseISO } from 'date-fns';

export default function Item(props) {
  const { item, cp, itn, index, loading, aS, 
    // onRestore, 
    onDelete } = props;
  const profile = item.user && item.user.profile ? item.user.profile : '';
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
      <td className='has-text-centered'>{item.itemId}</td>
      <td className='is-capitalized has-text-centered'>{item.name}</td>
      <td className='has-text-centered'>{item.category}</td>
      <td className='has-text-centered'>
        {item.createdAt &&
          format(parseISO(item.createdAt), 'd LLLL yyyy hh:mm:ss aa')}
      </td>
      <td className='is-capitalized has-text-centered'>{profile.name}</td>
      <td className='has-text-centered'>
        <div>
          {/* {aS.r === true && (
            <button
              className='button is-small is-rounded is-success is-outlined mr-1 mb-1'
              onClick={() => onRestore(item)}
            >
              <i className='fas fa-reply-all icon' />
            </button>
          )} */}
          {aS.d === true && (
            <button
              className='button is-small is-rounded is-danger is-outlined mr-1 mb-1'
              onClick={() => onDelete(item)}
            >
              <i className='fas fa-trash-alt icon' />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
