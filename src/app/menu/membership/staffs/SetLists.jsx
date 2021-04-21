import React from 'react';
import Item from './SetListsItem';

export default function SetLists(props) {
  const {
    items,
    cp,
    itn,
    tl,
    loading,
    aS,
    onSet,
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
            onSet={onSet}
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
