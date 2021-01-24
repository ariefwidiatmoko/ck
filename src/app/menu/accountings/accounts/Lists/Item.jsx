import React from 'react';

export default function Item(props) {
  const { item, index, loading, aS, onEdit, onDelete, onRestore, onHDelete } = props;
  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  return (
    <tr>
      <td className='has-text-centered'>{index + 1}</td>
      <td
        className={
          item.headerDetail === 'Header'
            ? 'has-text-centered has-text-weight-semibold'
            : 'has-text-centered'
        }
      >
        {item.code}
      </td>
      <td>
        <p
          className={
            item.headerDetail === 'Header'
              ? `has-text-weight-semibold ml-${item.level * 2}`
              : `ml-${item.level * 2}`
          }
        >
          {item.name}
        </p>
      </td>
      <td className='is-capitalized has-text-centered'>{item.type}</td>
      <td className='has-text-centered'>{item.headerDetail}</td>
      <td className='has-text-centered'>{item.level}</td>
      <td className='has-text-centered'>
        <div>
          {item.deletedAt === null && (
            <>
              {aS.u === true && (
                <button
                  onClick={() => onEdit(item)}
                  className='button is-small is-rounded is-primary is-outlined mr-2'
                >
                  <i className='fas fa-pen icon' />
                </button>
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
