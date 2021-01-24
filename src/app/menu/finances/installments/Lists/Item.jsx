import React from 'react';
import { format, parseISO } from 'date-fns';
import { numFormatted } from '../../../../common/helpers/othersHelpers';
import { Link } from 'react-router-dom';

export default function Item(props) {
  const { item, cp, itn, index, loading, aS } = props;
  const member = item.profile;
  const leftOver = Number(item.sumTotal) - Number(item.loanPaid);
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
        <span className='tag is-primary is-light'>{item.loanCode}</span>
      </td>
      <td className='has-text-centered'>
        {item.date && format(parseISO(item.date), 'd LLLL yyyy')}
      </td>
      <td className='is-capitalized has-text-centered'>
        {member.name}{' '}
        <span className='tag is-primary is-light'>{member.code}</span>
      </td>
      <td className='is-capitalized has-text-right'>
        {item.loanSum !== null ? 'Rp' + numFormatted(item.loanSum) : ''}
      </td>
      <td className='is-capitalized has-text-right'>
        {item.sumTotal !== null ? 'Rp' + numFormatted(item.sumTotal) : ''}
      </td>
      <td className='has-text-right'>
        {item.installmentFix !== null
          ? 'Rp' + numFormatted(item.installmentFix)
          : ''}
      </td>
      <td className='has-text-right'>
        {item.loanPaid !== null ? 'Rp' + numFormatted(item.loanPaid) : ''}
      </td>
      <td className='has-text-right'>
        {item.loanPaid !== null
          ? 'Rp' + numFormatted(leftOver)
          : 'Rp' + numFormatted(item.sumTotal)}
      </td>
      <td className='has-text-centered'>
        <div>
          {item.deletedAt === null && (
            <>
              {aS.v === true && (
                <Link
                  to={`/keuangan/angsuran/${item.loanCode}`}
                  className='button is-small is-rounded is-primary is-outlined mr-1 mb-1'
                >
                  <i className='fas fa-eye icon' />
                </Link>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

