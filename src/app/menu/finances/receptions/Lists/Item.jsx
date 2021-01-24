import React from 'react';
import { format, parseISO } from 'date-fns';
import { numFormatted } from '../../../../common/helpers/othersHelpers';

export default function Item(props) {
  const {
    item,
    cp,
    itn,
    index,
    loading,
    aS,
    onEdit,
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
  const pg = (cp - 1) * itn;
  return (
    <tr>
      <td className='has-text-centered'>{pg + index + 1}</td>
      <td className='has-text-centered'>
        <span className='tag is-primary is-light'>{item.receptionCode}</span>
      </td>
      <td className='has-text-centered'>
        {item.date && format(parseISO(item.date), 'd LLLL yyyy')}
      </td>
      <td className='has-text-centered'>{item.accountCode}</td>
      <td className='has-text-centered'>{item.receptionName}</td>
      <td className='is-capitalized has-text-centered'>
        {item.receptionType}
      </td>
      <td className='has-text-right'>
        {item.receptionSum > 0 ? 'Rp' + numFormatted(item.receptionSum) : '-'}
      </td>
      <td className='has-text-right'>{item.receptionUnit}</td>
      <td className='has-text-right'>
        {item.receptionTotal > 0
          ? 'Rp' + numFormatted(item.receptionTotal)
          : '-'}
      </td>
      <td className='has-text-centered'>
        <div>
          {item.deletedAt === null && (
            <>
              {aS.u === true && (
                <button
                  onClick={() => onEdit(item)}
                  className='button is-small is-rounded is-primary is-outlined mr-1 mb-1'
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
  )
}

