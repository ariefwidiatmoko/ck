import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { supervisorEdit } from '../redux/reduxApi';
import { connect } from 'react-redux';

const actions = {
  supervisorEdit,
};

class Item extends Component {
  render() {
    const { item, cp, itn, index, loading, aS, onUnset } = this.props;
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
                to={`/keanggotaan/badan-pengawas/detail/${item.code}`}
                className='button is-small is-rounded is-primary is-outlined'
                style={{ marginRight: 4, marginBottom: 4 }}
              >
                <i className='fas fa-eye icon' />
              </Link>
            )}
            {aS.u === true && (
              <>
                <Link
                  to={`/keanggotaan/badan-pengawas/edit/${item.code}`}
                  className='button is-small is-rounded is-primary is-outlined'
                  style={{ marginRight: 4, marginBottom: 4 }}
                >
                  <i className='fas fa-pen icon' />
                </Link>
                <button
                  className='button is-small is-rounded is-danger is-outlined'
                  onClick={() => onUnset(item)}
                >
                  <i className='fas fa-user-minus icon' />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, actions)(Item);
