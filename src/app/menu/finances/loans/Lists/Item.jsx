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
  const profile = item.profile;
  const pg = (cp - 1) * itn;
  const loanSum = item.loanSum ? Number(item.loanSum) : null;
  const InterestSum = (Number(item.interest) / 100) * Number(item.loanSum);
  const fees = JSON.parse(item.fees);
  const adm = fees && fees.adm ? Number(fees.adm) : null;
  const crk = fees && fees.crk ? Number(fees.crk) : null;
  const others = fees && fees.others ? Number(fees.others) : null;
  return (
    <tr>
      <td className='has-text-centered'>{pg + index + 1}</td>
      <td className='has-text-centered'>
        {item.createdAt && format(parseISO(item.createdAt), 'd/LL/yyyy')}
      </td>
      <td className='is-capitalized has-text-centered'>
        {profile.name}{' '}
        <span className='tag is-primary is-light'>{profile.code}</span>
      </td>
      <td className='is-capitalized has-text-right'>
        {loanSum !== null ? 'Rp' + numFormatted(loanSum) : ''}
      </td>
      <td className='has-text-right'>{item.month}</td>
      <td className='has-text-right'>{'Rp' + numFormatted(InterestSum)}</td>
      <td className='is-capitalized has-text-right'>
        {item.loanSaving !== null ? 'Rp' + numFormatted(item.loanSaving) : ''}
      </td>
      <td className='has-text-right'>{adm ? 'Rp' + numFormatted(adm) : ''}</td>
      <td className='has-text-right'>{crk ? 'Rp' + numFormatted(crk) : ''}</td>
      <td className='has-text-right'>
        {others ? 'Rp' + numFormatted(others) : ''}
      </td>
      <td className='has-text-right'>{'Rp' + numFormatted(item.sumTotal)}</td>
      <td className='has-text-right'>
        {'Rp' + numFormatted(item.installment)}
      </td>
      <td className='has-text-right'>
        {'Rp' + numFormatted(item.installmentFix)}
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
  );
}
