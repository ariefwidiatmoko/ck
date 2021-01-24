import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../modals/redux/modalActions';

const actions = {
  openModal,
};

class CreateEdit extends Component {
  render() {
    const {
      loading,
      history,
      onClickAccount,
      stateT,
      transactions,
      remarks,
      visible,
      onRemoveAccount,
      onClickCell,
      onBlur,
      onChangeInput,
      onSelectText,
      onClickSubmit,
    } = this.props;
    const debit =
      transactions.length > 0 ? transactions.filter((i) => i.dK === 'D') : [];
    let indexD = debit.length - 1;
    const kredit =
      transactions.length > 0 ? transactions.filter((i) => i.dK === 'K') : [];
    let indexK = indexD + kredit.length;
    const items = [...debit, ...kredit];
    return (
      <>
        <div className='table-container'>
          <table className='table is-fullwidth is-bordered is-hoverable'>
            <thead>
              <tr>
                <th className='has-text-centered'>Detail</th>
                <th className='has-text-centered'>Debit</th>
                <th className='has-text-centered'>Kredit</th>
              </tr>
            </thead>
            <tbody>
              <Lists
                stateT={stateT}
                items={items}
                remarks={remarks}
                visible={visible}
                onClickAccount={onClickAccount}
                onRemoveAccount={onRemoveAccount}
                onClickCell={onClickCell}
                onBlur={onBlur}
                onChangeInput={onChangeInput}
                indexD={indexD}
                indexK={indexK}
              />
              {debit.length === 0 && (
                <tr>
                  <td>
                    <div
                      className='hand-pointer has-text-info-dark'
                      onClick={() => onClickAccount('D')}
                    >
                      <i className='fas fa-plus icon is-size-7' /> Akun Debit
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {kredit.length === 0 && (
                <tr>
                  <td>
                    <div
                      className='ml-6 hand-pointer has-text-info-dark'
                      onClick={() => onClickAccount('K')}
                    >
                      <i className='fas fa-plus icon is-size-7' /> Akun Kredit
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              <tr>
                <td>
                  <div className='has-text-right'>Keterangan:</div>
                </td>

                <td
                  colSpan='2'
                  onClick={(e) => onClickCell(e)}
                  onBlur={(e) => onBlur(e)}
                >
                  {visible && (
                    <textarea
                      name='remarks'
                      className='textarea'
                      placeholder='Keterangan'
                      value={remarks}
                      onChange={(e) => onChangeInput(e)}
                      autoFocus
                      onFocus={(e) => onSelectText(e)}
                    ></textarea>
                  )}
                  {!visible && (
                    <div
                      className={
                        remarks && remarks.length !== 0
                          ? 'has-text-centered hand-pointer has-text-link'
                          : 'has-text-centered hand-pointer is-italic has-text-link'
                      }
                    >
                      {remarks && remarks.length !== 0 ? remarks : '--edit--'}
                    </div>
                  )}
                </td>
              </tr>
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

export default connect(null, actions)(CreateEdit);

const Lists = (props) => {
  const {
    stateT,
    items,
    remarks,
    visible,
    onClickAccount,
    onRemoveAccount,
    onClickCell,
    onBlur,
    onChangeInput,
    indexD,
    indexK,
  } = props;
  return (
    <>
      {items &&
        items.length !== 0 &&
        items.map((item, index) => (
          <Item
            key={index + item.code}
            index={index}
            stateT={stateT}
            item={item}
            remarks={remarks}
            visible={visible}
            rowSpan={items.length}
            onClickAccount={onClickAccount}
            onRemoveAccount={onRemoveAccount}
            onClickCell={onClickCell}
            onBlur={onBlur}
            onChangeInput={onChangeInput}
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
    stateT,
    item,
    onClickAccount,
    onRemoveAccount,
    onChangeInput,
    indexD,
    indexK,
  } = props;
  return (
    <tr>
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
      <td className='has-text-right'>
        {item.dK === 'D' && (
          <div>
            <input
              name={item.code}
              className='input is-small'
              type='text'
              placeholder='Input Debit'
              value={index === 0 ? stateT[item.code] : 0}
              onChange={(e) => onChangeInput(e)}
            />
          </div>
        )}
      </td>
      <td className='is-capitalized has-text-right'>
        {item.dK === 'K' && (
          <div>
            <input
              name={item.code}
              className='input is-small'
              type='text'
              placeholder='Input Kredit'
              value={stateT[item.code]}
              onChange={(e) => onChangeInput(e)}
            />
          </div>
        )}
      </td>
    </tr>
  );
};
