import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropzoneInput(props) {
  const {setFiles} = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });
  
  return (
    <div
      {...getRootProps()}
      className={'dropzone ' + (isDragActive && 'dropzone--isActive')}
    >
      <input {...getInputProps()} />
      <i className='fas fa-upload fa-3x icon is-large' />
      <h1>Tambah Foto</h1>
      <h1>& Upload</h1>
    </div>
  )
}

