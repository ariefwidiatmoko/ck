import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns'; 

export default function Item(props) {
  const { item, cp, itn, index, loading, aS, onDelete, onRestore, onHDelete } = props;
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
      <td className='is-capitalized has-text-centered'>{item.name}</td>
      <td className='is-capitalized has-text-centered'>{item.fullname}</td>
      <td className='has-text-centered'>
        {item.joinDate && format(parseISO(item.joinDate), 'd LLLL yyyy')}
      </td>
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
          {item.deletedAt === null && (
          <>
            {aS.v === true && (
              <Link
                to={`/keanggotaan/anggota/detail/${item.code}`}
                className='button is-small is-rounded is-primary is-outlined'
                style={{ marginRight: 4, marginBottom: 4 }}
              >
                <i className='fas fa-eye icon' />
              </Link>
            )}
            {aS.u === true && (
              <Link
                to={`/keanggotaan/anggota/edit/${item.code}`}
                className='button is-small is-rounded is-primary is-outlined'
                style={{ marginRight: 4, marginBottom: 4 }}
              >
                <i className='fas fa-pen icon' />
              </Link>
            )}
            {aS.d === true && (
              <button
                className='button is-small is-rounded is-danger is-outlined'
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
                  className='button is-small is-rounded is-danger is-outlined'
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