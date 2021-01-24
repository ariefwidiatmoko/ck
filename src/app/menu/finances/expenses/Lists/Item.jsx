import React from 'react';
import { format, parseISO } from 'date-fns';
import { numFormatted } from '../../../../common/helpers/othersHelpers';

export default function Item(props) {
  const { item, cp, itn, index, loading, aS, onEdit, onDelete, onRestore, onHDelete } = props;
  const member = item.profile;
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
      <td className='has-text-centered'><span className='tag is-primary is-light'>{item.savingCode}</span></td>
      <td className='has-text-centered'>
        {item.date && format(parseISO(item.date), 'd LLLL yyyy')}
      </td>
      <td className='is-capitalized has-text-centered'>
        {member.name}{' '}
        <span className='tag is-primary is-light'>{member.code}</span>
      </td>
      <td className='is-capitalized has-text-right'>
        {item.savingPrimary !== null
          ? 'Rp' + numFormatted(item.savingPrimary)
          : ''}
      </td>
      <td className='has-text-right'>
        {item.savingSecondary !== null
          ? 'Rp' + numFormatted(item.savingSecondary)
          : ''}
      </td>
      <td className='has-text-right'>
        {item.savingTertier !== null
          ? 'Rp' + numFormatted(item.savingTertier)
          : ''}
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

