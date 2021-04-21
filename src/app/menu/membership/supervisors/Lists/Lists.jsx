import React, { Component, Fragment } from 'react';
import Item from './Item';

class Lists extends Component {
  render() {
    const {
      items,
      roles,
      cp,
      itn,
      tl,
      loading,
      aS,
      onUnset,
    } = this.props;
    return (
      <Fragment>
        {items &&
          items.length !== 0 &&
          items.map((item, index) => (
            <Item
              key={item.id}
              index={index}
              item={item}
              cp={cp}
              itn={itn}
              roles={roles}
              loading={loading}
              aS={aS}
              onUnset={onUnset}
            />
          ))}
        {items && items.length === 0 && (
          <tr>
            <td colSpan='5 is-capitalized'>Tidak Ada {tl}</td>
          </tr>
        )}
      </Fragment>
    );
  }
}

export default Lists;
