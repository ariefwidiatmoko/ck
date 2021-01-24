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
    onDelete,
    onRestore,
    onHDelete,
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
            onDelete={onDelete}
            onRestore={onRestore}
            onHDelete={onHDelete}
          />
        ))}
      {items && items.length === 0 && (
        <tr>
          <td colSpan='5' className='is-capitalized'>
            Tidak Ada data {tl}
          </td>
        </tr>
      )}
    </>
  );
}
