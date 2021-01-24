import React from 'react';
import Lists from '../../../common/lists/members/Lists';
import PageNumber from '../../pages/_part/_fragment/PageNumber';

export default function FormMember(props) {
  const {
    tl,
    cp,
    itn,
    tt,
    items,
    loading,
    onClickMember,
    onHover,
    elementId,
    closeModal,
    handleItemNumber,
    handlePage,
  } = props;
  return (
    <>
      <section className='modal-card-body is-size-6'>
        <div
          className='table-container'
          style={{ marginTop: -20, marginBottom: -7 }}
        >
          <table className='table is-fullwidth is-hoverable mb-1'>
            <thead>
              <tr>
                <th className='has-text-centered'>No</th>
                <th className='has-text-centered'>Kode</th>
                <th className='has-text-centered'>Panggilan</th>
                <th className='has-text-centered'>Nama Lengkap</th>
                <th className='has-text-centered'>Status</th>
                <th className='has-text-centered'>Pilih</th>
              </tr>
            </thead>
            <Lists
              items={items}
              cp={cp}
              itn={itn}
              tl={tl}
              loading={loading}
              onClickMember={onClickMember}
              onHover={onHover}
              elementId={elementId}
            />
          </table>
          <PageNumber
            cp={cp}
            itn={tt < 10 ? tt : itn}
            handleNumber={handleItemNumber}
            tt={tt}
            getPage={handlePage}
            tl={tl}
          />
        </div>
      </section>
      <footer className='modal-card-foot py-3'>
        <button
          className='button custom-grey is-small is-rounded is-outlined'
          onClick={closeModal}
        >
          <i className='fas fa-arrow-left icon' />
        </button>
      </footer>
    </>
  );
}
