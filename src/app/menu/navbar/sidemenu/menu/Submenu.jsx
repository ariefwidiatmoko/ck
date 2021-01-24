import React from 'react';
import { Link } from 'react-router-dom';

export default function Submenu(props) {
  const { subm, c, pathname } = props;
  let url = subm.alias;
  const regex = new RegExp(url);
  const isActive = regex.test(pathname);
  const s = c.filter((i) => {
    return i.id === subm.id;
  });
  return (
    <>
      {c && s[0] && s[0].v === true && (
        <li>
          <Link
            to={subm.subUrl}
            className={
              isActive === true
                ? 'is-active has-background-primary custom-text-overflow disable-select'
                : 'custom-text-overflow disable-select'
            }
          >
            {subm.submenuTitle}
          </Link>
        </li>
      )}
    </>
  )
}

