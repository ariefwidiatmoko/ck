import React from 'react';

export default function Progressbar() {
  return (
    <div>
      <h5>Memproses...</h5>
      <progress className='progress is-small is-info' max='100'></progress>
    </div>
  );
}
