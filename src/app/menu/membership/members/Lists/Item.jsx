import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { memberEdit } from '../redux/reduxApi';
import { connect } from 'react-redux';

const actions = {
  memberEdit,
};

class Item extends Component {
  render() {
    const { item, cp, itn, index, loading, aS, onDelete } = this.props;
    if (loading)
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    const pg = (cp - 1) * itn;
    return (
      <tr>
        <td className='has-text-centered'>{pg + index + 1}</td>
        <td className='has-text-centered'>{item.code}</td>
        <td className='is-capitalized has-text-centered'>{item.name}</td>
        <td className='is-capitalized has-text-centered'>{item.fullname}</td>
        <td className='has-text-centered'>
          {item.joinDate && format(parseISO(item.joinDate), 'd LLLL yyyy')}
        </td>
        <td className='has-text-centered'>
          <input
            name={item.code}
            type='checkbox'
            checked={item.activeStatus === true ? 'checked' : ''}
            readOnly
          />
        </td>
        <td className='has-text-centered'>
          <div>
            {aS.v === true && (
              <Link
                to={`/keanggotaan/anggota/detail/${item.code}`}
                className='button is-small is-rounded is-primary is-outlined'
                style={{ marginRight: 4, marginBottom: 4 }}
              >
                <i className='fas fa-eye icon' />
              </Link>
            )}
            {aS.u === true && (
              <Link
                to={`/keanggotaan/anggota/edit/${item.code}`}
                className='button is-small is-rounded is-primary is-outlined'
                style={{ marginRight: 4, marginBottom: 4 }}
              >
                <i className='fas fa-pen icon' />
              </Link>
            )}
            {aS.d === true && (
              <button
                className='button is-small is-rounded is-danger is-outlined'
                onClick={() => onDelete(item.id, item.code, item.name)}
              >
                <i className='fas fa-trash-alt icon' />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, actions)(Item);
