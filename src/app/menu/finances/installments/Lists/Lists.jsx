import React from 'react';
import Item from './Item';

export default function Lists(props) {
  const {
    items,
    cp,
    itn,
    tl,
    loading,
    aS,
  } = props;
  return (
    <>
      {items &&
        items.length !== 0 &&
        items.map((item, index) => (
          <Item
            key={item.id}
            index={index}
            item={item}
            cp={cp}
            itn={itn}
            loading={loading}
            aS={aS}
          />
        ))}
      {items && items.length === 0 && (
        <tr>
          <td colSpan='8' className='is-capitalized'>
            Tidak Ada data {tl}
          </td>
        </tr>
      )}
    </>
  )
}

