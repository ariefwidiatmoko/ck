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
    onRestore,
    onDelete,
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
            onRestore={onRestore}
            onDelete={onDelete}
          />
        ))}
      {items && items.length === 0 && (
        <tr>
          <td colSpan='5 is-capitalized'>Tidak Ada data di {tl}</td>
        </tr>
      )}
    </>
  )
}

