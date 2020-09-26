import React, { Component } from "react";

class UserFormEditTab extends Component {
  render() {
    const { userId, onChangeActiveTab, activeTab } = this.props;
    return (
      <div className="tabs">
        <ul>
          <li onClick={() => onChangeActiveTab('basic')} className={activeTab === 'basic' ? "is-active" : ""}>
            <div to={`/pengaturan-user/user/edit/${userId}`}>
              <span className="icon is-small">
                <i className="fas fa-id-card-alt" aria-hidden="true"></i>
              </span>
              Info
            </div>
          </li>
          <li onClick={() => onChangeActiveTab('account')} className={activeTab === "account" ? "is-active" : ""}>
            <div to={`/pengaturan-user/user/edit/${userId}`}>
              <span className="icon is-small">
                <i className="fas fa-user-cog" aria-hidden="true"></i>
              </span>
              Akun
            </div>
          </li>
          <li onClick={() => onChangeActiveTab('role')} className={activeTab === 'role' ? "is-active" : ""}>
            <div to={`/pengaturan-user/user/edit/${userId}`}>
              <span className="icon is-small">
                <i className="fas fa-user-shield" aria-hidden="true"></i>
              </span>
              Role
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserFormEditTab;
