import React from 'react';
import { Link } from 'react-router-dom';

export default function Item(props) {
  const { item, index, loading, aS, onDelete } = props;
  const name = { savings: 'Simpanan', loans: 'Pinjaman' };
  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  return (
    <tr>
      <td className='has-text-centered'>{index + 1}</td>
      <td className='has-text-centered'>{item.code}</td>
      <td className='has-text-centered'>{name[item.name]}</td>
      <td className='has-text-centered'>
        <div>
          <>
            {aS.u === true && (
              <Link
                to={'/pengaturan-umum/jurnal-auto/edit/' + item.code}
                className='button is-small is-rounded is-primary is-outlined mr-2'
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
        </div>
      </td>
    </tr>
  );
}
