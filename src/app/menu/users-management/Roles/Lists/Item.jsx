import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export default function Item(props) {
  const { item, index, loading, aS } = props;
  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  return (
    <tr>
      <td className='has-text-centered'>{index + 1}</td>
      <td className='is-capitalized has-text-centered'>{item.name}</td>
      <td className='has-text-centered'>
        {item.createdAt &&
          format(parseISO(item.createdAt), 'd LLLL yyyy hh:mm aa')}
      </td>
      <td className='has-text-centered'>
        <div>
          {aS.u === true && (
            <Link
              to={`/pengaturan-user/role/edit/${item.id}`}
              className='button is-small is-rounded is-primary is-outlined mr-2'
            >
            <i className='fas fa-pen icon' />
            </Link>
          )}
          {aS.d === true && (
            <button className='button is-small is-rounded is-danger is-outlined'>
            <i className='fas fa-trash-alt icon' />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
