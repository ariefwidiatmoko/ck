import React from 'react';
import Item from './Item';
import { objectToArray } from '../../../../common/helpers/objectHelpers';

export default function Lists(props) {
  const { items, loading, aS } = props;
  return (
    <>
      {items && items.length === 0 && (
        <tr>
          <td colSpan='4'>Tidak Ada data Role</td>
        </tr>
      )}
      {items &&
        items.length !== 0 &&
        objectToArray(items).map((item, index) => (
          <Item
            key={item.id}
            index={index}
            item={item}
            loading={loading}
            aS={aS}
          />
        ))}
    </>
  )
}

