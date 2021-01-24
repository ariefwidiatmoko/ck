import React, { Component } from 'react';

class CreateEdit extends Component {
  render() {
    const {
      itemName,
      items,
      loading,
      history,
      onChangeSelect,
      onClickAccount,
      onRemoveAccount,
      onClickSubmit,
    } = this.props;
    const debit =
      items[0] && items.length !== 0 ? items.filter((i) => i.dK === 'D') : [];
    let indexD = debit.length - 1;
    const kredit =
      items[0] && items.length !== 0 ? items.filter((i) => i.dK === 'K') : [];
    let indexK = indexD + kredit.length;
    return (
      <>
        <div className='field'>
          <div className='control'>
            <div className='select is-fullwidth'>
              <select value={itemName} onChange={(e) => onChangeSelect(e)}>
                <option>Pilih Jurnal Auto</option>
                <option key='1' value='savings'>
                  Simpanan
                </option>
                <option key='2' value='loans'>
                  Pinjaman
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className='table-container'>
          <table className='table is-fullwidth is-bordered is-hoverable'>
            <thead>
              <tr>
                <th className='has-text-centered'>No</th>
                <th className='has-text-centered'>Detail</th>
              </tr>
            </thead>
            <tbody>
              <Lists
                items={items}
                indexD={indexD}
                indexK={indexK}
                onClickAccount={onClickAccount}
                onRemoveAccount={onRemoveAccount}
              />
              {debit.length === 0 && (
                <tr>
                  <td>
                    <div className='has-text-centered'>1</div>
                  </td>
                  <td>
                    <div
                      className='hand-pointer has-text-info-dark'
                      onClick={() => onClickAccount('D')}
                    >
                      <i className='fas fa-plus icon is-size-7' /> Akun Debit
                    </div>
                  </td>
                </tr>
              )}
              {kredit.length === 0 && (
                <tr>
                  <td>
                    <div className='has-text-centered'>2</div>
                  </td>
                  <td>
                    <div
                      className='ml-6 hand-pointer has-text-info-dark'
                      onClick={() => onClickAccount('K')}
                    >
                      <i className='fas fa-plus icon is-size-7' /> Akun Kredit
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          className='field is-grouped'
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <div className='control'>
            <button
              type='submit'
              onClick={() => onClickSubmit()}
              disabled={loading}
              className={
                loading
                  ? 'button is-primary is-small is-rounded is-outlined is-loading'
                  : 'button is-primary is-small is-rounded is-outlined'
              }
            >
              <i className='fas fa-save icon' />
            </button>
          </div>
          <div className='control'>
            <button
              type='button'
              onClick={() => history.goBack()}
              className='button custom-grey is-small is-rounded is-outlined'
            >
              <i className='fas fa-arrow-left icon' />
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CreateEdit;

const Lists = (props) => {
  const { items, onClickAccount, onRemoveAccount, indexD, indexK } = props;
  return (
    <>
      {items &&
        items.length !== 0 &&
        items.map((item, index) => (
          <Item
            key={index + item.code}
            index={index}
            item={item}
            rowSpan={items.length}
            onClickAccount={onClickAccount}
            onRemoveAccount={onRemoveAccount}
            indexD={indexD}
            indexK={indexK}
          />
        ))}
    </>
  );
};

const Item = (props) => {
  const {
    index,
    item,
    onClickAccount,
    onRemoveAccount,
    indexD,
    indexK,
  } = props;
  return (
    <tr>
      <td>
        <div className='has-text-centered'>{index + 1}</div>
      </td>
      <td>
        <div className='level'>
          <div className='level-left'>
            <div className={item.dK === 'D' ? 'level-item' : 'level-item ml-6'}>
              {item.code + ' - ' + item.name}
            </div>
          </div>
          <div className='level-right'>
            {index === indexD && item.dK === 'D' && (
              <div
                className='level-item has-text-right hand-pointer'
                onClick={() => onClickAccount('D')}
              >
                <i className='fas fa-plus icon is-size-7 has-text-info-dark has-background-info-light' />
              </div>
            )}
            {index === indexK && item.dK === 'K' && (
              <div
                className='level-item has-text-right hand-pointer'
                onClick={() => onClickAccount('K')}
              >
                <i className='fas fa-plus icon is-size-7 has-text-info-dark has-background-info-light' />
              </div>
            )}
            <div
              className='level-item has-text-right hand-pointer'
              onClick={() => onRemoveAccount(item)}
            >
              <i className='fas fa-minus icon is-size-7 has-text-danger-dark has-background-danger-light' />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};
