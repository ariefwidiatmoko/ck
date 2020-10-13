import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

class Submenu extends Component {
  render() {
    const { subm, c, pathname } = this.props;
    let url = subm.alias;
    const regex = new RegExp(url);
    const isActive = regex.test(pathname);
    const s = c.filter((i) => {
      return i.id === subm.id;
    });
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default Submenu;
