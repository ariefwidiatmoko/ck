import React, { Component } from 'react';
import LoadingButton from '../../../main/LoadingButton';
import { format, parseISO } from 'date-fns';
import { numFormatted } from '../../../common/helpers/othersHelpers';
import { openModal } from '../../modals/redux/modalActions';
import { connect } from 'react-redux';

const actions = {
  openModal,
};

class TableInstallment extends Component {
  onEdit = (item) => {
    const { openModal } = this.props;
    openModal('installmentEdit', { data: { item: item } });
  };

  onDelete = (item) => {
    const { openModal } = this.props;
    openModal('installmentDelete', {
      data: {
        item: item,
      },
    });
  };

  render() {
    const { loading, items, tl, aS } = this.props;
    return (
      <div className='table-container mt-5'>
        <div className='is-size-6 has-text-weight-semibold mb-2'>
          Detail {tl} Pinjaman
        </div>
        <table className='table is-fullwidth is-hoverable is-bordered'>
          <thead>
            <tr>
              <th className='has-text-centered'>No</th>
              <th className='has-text-centered'>Kode</th>
              <th className='has-text-centered'>Tanggal</th>
              <th className='has-text-centered'>Angsuran</th>
              <th className='has-text-centered'>Keterangan</th>
              <th className='has-text-centered'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? (
              <tr>
                <td>
                  <LoadingButton />
                </td>
              </tr>
            ) : (
              <Lists
                loading={loading}
                items={items}
                tl={tl}
                aS={aS}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, actions)(TableInstallment);

const Lists = ({ loading, items, tl, aS, onEdit, onDelete }) => {
  return (
    <>
      {items &&
        items.length !== 0 &&
        items.map((item, index) => (
          <Item
            key={item.installmentCode}
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
          <td colSpan='8' className='is-capitalized'>
            Tidak Ada data {tl}
          </td>
        </tr>
      )}
    </>
  );
};

const Item = ({ index, item, loading, aS, onEdit, onDelete }) => {
  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  return (
    <tr>
      <td className='has-text-centered'>{index + 1}</td>
      <td className='has-text-centered'>{item.installmentCode}</td>
      <td className='has-text-centered'>
        {item.date && format(parseISO(item.date), 'd LLLL yyyy')}
      </td>
      <td className='is-capitalized has-text-centered'>
        {'Rp' + numFormatted(item.installmentSum)}
      </td>
      <td className='is-capitalized has-text-centered'>{item.remarks}</td>
      <td className='has-text-centered'>
        <div>
          {aS.u === true && (
            <button
              onClick={() => onEdit(item)}
              className='button is-small is-rounded is-primary is-outlined mr-1 mb-1'
            >
              <i className='fas fa-pen icon' />
            </button>
          )}
          {aS.d === true && (
            <button
              onClick={() => onDelete(item)}
              className='button is-small is-rounded is-danger is-outlined mr-1 mb-1'
            >
              <i className='fas fa-trash-alt icon' />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
