import React from 'react';
import Item from './Item';

export default function Lists(props) {
  const {
    items,
    tl,
    loading,
    aS,
    onEdit,
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
            loading={loading}
            aS={aS}
            onEdit={onEdit}
            onDelete={onDelete}
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
