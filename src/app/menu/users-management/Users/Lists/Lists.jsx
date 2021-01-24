import React from 'react';
import UserListItem from './Item';

export default function Lists(props) {
  const {
    items,
    roles,
    tl,
    cp,
    itn,
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
          <UserListItem
            key={item.id}
            index={index}
            item={item}
            cp={cp}
            itn={itn}
            roles={roles}
            loading={loading}
            aS={aS}
            onDelete={onDelete}
            onRestore={onRestore}
            onHDelete={onHDelete}
          />
        ))}
      {items && items.length === 0 && (
        <tr>
          <td colSpan='5'>Tidak Ada data {tl}</td>
        </tr>
      )}
    </>
  );
}
