import React, { Component } from 'react';
import Item from './Item';

class Lists extends Component {
  render() {
    const {
      items,
      cp,
      itn,
      tl,
      loading,
      onClickMember,
      onHover,
      elementId,
    } = this.props;
    return (
      <tbody>
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
              onClickMember={onClickMember}
              onHover={onHover}
              elementId={elementId}
            />
          ))}
        {items && items.length === 0 && (
          <tr>
            <td colSpan='5 is-capitalized'>Tidak Ada data {tl}</td>
          </tr>
        )}
      </tbody>
    );
  }
}

export default Lists;
