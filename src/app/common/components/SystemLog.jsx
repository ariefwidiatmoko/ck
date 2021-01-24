import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import Tooltip from 'react-tooltip-lite';

export default function SystemLog(props) {
  const { logs } = props;
  const [full, setFull] = useState(0);
  let someLogs = [];
  if (logs.length > 2) {
    someLogs.push(logs[0], logs[logs.length - 1]);
  } else {
    someLogs = logs;
  }

  function handleLogs() {
    if (full === 0) {
      setFull(1);
    } else {
      setFull(0);
    }
  }

  const action = {create: 'Dibuat', edit: 'Diedit', delete: 'Dihapus', restore: 'Dikembalikan'}
  const icon = {create: 'fas fa-user-plus', edit: 'fas fa-user-edit', delete: 'fas fa-user-times', restore: 'fas fa-user-clock'}

  const setLogs = full === 0 ? someLogs : logs;

  return (
    <article className='panel'>
      <div className='panel-block is-size-5 has-text-weight-semibold'>
        Sistem Log
      </div>
      {setLogs.map((log, index) => (
        <div key={index} className='panel-block ml-2'>
          <span className='panel-icon has-text-black'>
            <Tooltip
              content={action[log.action]}
            >
              <i
                className={icon[log.action]}
                aria-hidden='true'
              ></i>
            </Tooltip>
          </span>
          {log.user.username} pada{' '}
          {format(parseISO(log.time), 'd LLLL yyyy - HH:mm:ss')} WIB
        </div>
      ))}
      {logs.length > 2 && (
        <div className='panel-block'>
          <button
            onClick={handleLogs}
            className='button is-primary is-small is-rounded is-outlined'
          >
            {full === 0 ? (
              <i className='fas fa-angle-double-down'></i>
            ) : (
              <i className='fas fa-angle-double-up'></i>
            )}
          </button>
        </div>
      )}
    </article>
  );
}
