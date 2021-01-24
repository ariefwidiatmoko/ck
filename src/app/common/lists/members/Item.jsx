import React, { Component } from 'react';

class Item extends Component {
  render() {
    const {
      item,
      cp,
      itn,
      index,
      loading,
      onClickMember,
      onHover,
      elementId,
    } = this.props;
    if (loading)
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    const pg = (cp - 1) * itn;
    const icon =
      elementId === item.code ? (
        <i className='fas fa-check icon' />
      ) : (
        <i className='fas fa-minus icon' />
      );
    return (
      <tr onClick={() => onClickMember(item)}>
        <td className='has-text-centered'>
          <div
            className='hand-pointer'
            data-id={item.code}
            onMouseEnter={(e) => onHover(e, true)}
            onMouseLeave={(e) => onHover(e, false)}
          >
            {pg + index + 1}
          </div>
        </td>
        <td className='has-text-centered'>
          <div
            className='hand-pointer'
            data-id={item.code}
            onMouseEnter={(e) => onHover(e, true)}
            onMouseLeave={(e) => onHover(e, false)}
          >
            {item.code}
          </div>
        </td>
        <td className='is-capitalized has-text-centered'>
          <div
            className='hand-pointer'
            data-id={item.code}
            onMouseEnter={(e) => onHover(e, true)}
            onMouseLeave={(e) => onHover(e, false)}
          >
            {item.name}
          </div>
        </td>
        <td className='is-capitalized has-text-centered'>
          <div
            className='hand-pointer'
            data-id={item.code}
            onMouseEnter={(e) => onHover(e, true)}
            onMouseLeave={(e) => onHover(e, false)}
          >
            {item.fullname}
          </div>
        </td>
        <td className='has-text-centered'>
          <div
            className='hand-pointer'
            data-id={item.code}
            onMouseEnter={(e) => onHover(e, true)}
            onMouseLeave={(e) => onHover(e, false)}
          >
            {item.activeStatus !== null
              ? item.activeStatus === true
                ? 'Anggota'
                : 'Non Anggota'
              : 'Non Anggota'}
          </div>
        </td>
        <td className='has-text-centered'>
          <div className='hand-pointer'>
            <button
              className='button is-small is-link is-outlined'
              data-id={item.code}
              onMouseEnter={(e) => onHover(e, true)}
              onMouseLeave={(e) => onHover(e, false)}
            >
              {icon}
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default Item;
