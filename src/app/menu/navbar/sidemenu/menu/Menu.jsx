import React, { Component, Fragment } from "react";
import Submenu from "./Submenu";
import { Link } from "react-router-dom";

class Menu extends Component {
  state = {
    openDropdown: false,
  };

  handleToggleSubmenu = () => () => {
    this.setState({
      openDropdown: !this.state.openDropdown,
    });
  };

  render() {
    const { pathname, m, c } = this.props;
    const { openDropdown } = this.state;
    let url = m.alias;
    const regex = new RegExp(url);
    const isActive = regex.test(pathname);
    const getMenu = c.m.filter((menu) => {
      return menu.id === m.id;
    })[0]
    return (
      <Fragment>
        { getMenu && getMenu.v === true && (
          <li>
            {m.subm.length === 0 && (
              <Link
                to={m.url}
                className={
                  pathname === m.url
                    ? "disable-select is-active has-background-primary is-size-6 custom-text-overflow"
                    : "disable-select is-size-6 custom-text-overflow"
                }
              >
                <i className={`fas fa-${m.icon} icon`} /> {m.title}
              </Link>
            )}
            {m.subm.length > 0 && (
              <div
                onClick={this.handleToggleSubmenu("")}
                className={
                  isActive === true
                    ? "disable-select has-background-white-ter has-text-primary is-size-6 custom-text-overflow"
                    : "disable-select is-size-6 custom-text-overflow"
                }
              >
                <i className={`fas fa-${m.icon} icon`} /> {m.title}
              </div>
            )}
            <ul
              className={
                openDropdown === true ? "" : "is-hidden"
              }
            >
              {m.subm.map((i, x) => (
                <Submenu key={i.id} subm={i} c={c.subm} pathname={pathname} />
              ))}
            </ul>
          </li>
        )}
      </Fragment>
    );
  }
}

export default Menu;
