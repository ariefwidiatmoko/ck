import React, { Component, Fragment } from "react";
import ListItems from "./Items";

class Lists extends Component {
  render() {
    const { items, roles, cp, itn, tl, loading, aS, onDelete } = this.props;
    return (
      <Fragment>
        {items &&
          items.length !== 0 &&
          items.map((item, index) => (
            <ListItems
              key={item.id}
              index={index}
              item={item}
              cp={cp}
              itn={itn}
              roles={roles}
              loading={loading}
              aS={aS}
              onDelete={onDelete}
            />
          ))}
        {items && items.length === 0 && (
          <tr>
            <td colSpan="5 is-capitalized">Tidak Ada {tl}</td>
          </tr>
        )}
      </Fragment>
    );
  }
}

export default Lists;
