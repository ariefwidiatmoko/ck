import React, { Component } from "react";

export class Dashboard extends Component {
  render() {
    return (
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column is-three-quarters">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">Top Sales Total </div>
                  <div className="card-content">
                    <p className="is-size-3">56,878</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <nav className="panel">
                  <p className="panel-heading">Post Activities</p>
                  <div className="panel-block">
                    <div className="control has-icons-left">
                      <input
                        className="input is-small"
                        type="text"
                        placeholder="search"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    bulma
                  </div>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    marksheet
                  </div>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    minireset.css
                  </div>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    jgthms.github.io
                  </div>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <i className="fas fa-code-branch" aria-hidden="true"></i>
                    </span>
                    daniellowtw/infboard
                  </div>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <i className="fas fa-code-branch" aria-hidden="true"></i>
                    </span>
                    mojs
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
