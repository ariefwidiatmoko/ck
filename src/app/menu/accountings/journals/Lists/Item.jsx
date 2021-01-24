import React from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { numFormatted } from '../../../../common/helpers/othersHelpers';

export default function Item(props) {
  const {
    item,
    cp,
    itn,
    index,
    loading,
    aS,
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
  const deb = item && JSON.parse(item.debit);
  const detDeb = deb.map((item, i) => {
    return (
      <p key={item.code}>
        {item.code + ' - ' + item.name + ' ...... Rp' + numFormatted(item.sum)}
      </p>
    );
  });
  const cre = item && JSON.parse(item.credit);
  const detCre = cre.map((item, i) => {
    return (
      <p key={item.code}>
        {item.code + ' - ' + item.name + ' ...... Rp' + numFormatted(item.sum)}
      </p>
    );
  });
  return (
    <tr>
      <td className='has-text-centered'>{pg + index + 1}</td>
      <td className='has-text-centered'>
        <span className='tag is-primary is-light'>{item.code}</span>
      </td>
      <td className='has-text-centered'>
        {item.date && format(parseISO(item.date), 'd LLLL yyyy')}
      </td>
      <td>
        <div>{detDeb}</div>
        <div className='ml-5'>{detCre}</div>
      </td>
      <td className='has-text-centered'>{item.remarks}</td>
      <td className='has-text-centered'>
        <div>
          {item.deletedAt === null && (
            <>
              {aS.u === true && (
                <Link
                  to={'/akuntansi/jurnal/edit/' + item.code}
                  className='button is-small is-rounded is-primary is-outlined mr-1 mb-1'
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
