import React from 'react';
import { Link } from 'react-router-dom';

export default function ImportFileInput({
  handleExcelUpload,
  inputKey,
  tl,
  link,
}) {
  return (
    <>
      <br />
      <div className='field'>
        <h5 className='label has-text-centered'>
          Pilih Excel (.xls, .xlsx) untuk import {tl}
        </h5>
        <div className='file is-info has-name is-small is-fullwidth'>
          <label className='file-label'>
            <input
              name='export-user'
              className='file-input'
              type='file'
              multiple={false}
              accept='.xls,.xlsx'
              onChange={(e) => handleExcelUpload(e)}
              key={inputKey}
            />
            <span className='file-cta'>
              <span className='file-icon'>
                <i className='fas fa-upload'></i>
              </span>
              <span className='file-label'>Upload File</span>
            </span>
            <span className='file-name'>Pilih file...</span>
          </label>
        </div>
        <p className='is-italic is-size-7'>
          * download <Link to={link} target="_blank" download>Template Impor {tl}</Link>
        </p>
      </div>
      <br />
    </>
  );
}
