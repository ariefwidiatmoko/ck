import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import XLSX from "xlsx";
import { usersExp as usersExport, resetExport } from "./redux/reduxApi";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

const mapState = (state) => ({
  auth: state.auth,
  loading: state.async.loading,
  progress: state.progress,
  dataExport: state.usersExport,
});

const actions = {
  usersExport,
  resetExport,
};

class UserFormExport extends Component {
  state = {
    data: [],
    inputKey: Date.now(),
  };

  handleExcelUpload = (e) => {
    let file = e.target.files[0];

    const reader = new FileReader();
    if (file) {
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        let data = new Uint8Array(reader.result);
        let wb = XLSX.read(data, { type: "array" });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        // Convert Array of Arrays
        const dat = XLSX.utils.sheet_to_json(ws, { header: 2 });

        this.setState({ data: dat });
      };
    }
  };

  handleExport = () => {
    this.props.usersExport(this.state.data, this.props.auth);
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      data: [],
      inputKey: Date.now(),
    });
    if (this.props.onChange) this.props.onChange(null);
  };

  handleRetry = () => {
    this.setState({
      data: [],
      inputKey: Date.now(),
    });
    if (this.props.onChange) this.props.onChange(null);
    this.props.resetExport();
  };

  handleGoBack = () => {
    this.props.history.push("/pengaturan-user/user");
    this.props.resetExport();
  };

  render() {
    const { loading, dataExport, progress } = this.props;
    const { data } = this.state;
    const successData = dataExport[0];
    const errorData = dataExport[1];
    return (
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable">
            <div className="column is-third-quarter">
              <div className="box">
                <form
                  autoComplete="off"
                  style={{ marginTop: 15, marginBottom: 30 }}
                >
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <nav
                          className="breadcrumb is-size-7"
                          aria-label="breadcrumbs"
                        >
                          <ul className="margin-10-25">
                            <li>
                              <Link to="/pengaturan-user/user">User</Link>
                            </li>
                            <li className="is-active">
                              <Link to={`/pengaturan-user/user/export`}>
                                Export
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>

                    <div className="level-right">
                      <div className="level-item">
                        <div className="buttons">
                          {data && data[0] && (
                            <Fragment>
                              <button
                                disabled={loading}
                                onClick={this.props.handleSubmit(
                                  this.handleExport
                                )}
                                className={
                                  loading
                                    ? "button is-small is-primary is-rounded is-outlined is-loading"
                                    : "button is-small is-primary is-rounded is-outlined"
                                }
                                style={{ marginRight: 10 }}
                              >
                                <i className="fas fa-save icon" />
                              </button>
                              <button
                                disabled={loading}
                                onClick={this.handleCancel}
                                className="button custom-grey is-small is-rounded is-outlined"
                              >
                                <i className="fas fa-redo icon" />
                              </button>
                            </Fragment>
                          )}
                          {dataExport.length > 0 && (
                            <button
                              disabled={loading}
                              onClick={this.handleRetry}
                              className="button is-primary is-small is-rounded is-outlined"
                            >
                              <i className="fas fa-file-export icon" />
                            </button>
                          )}
                          <button
                            disabled={loading}
                            onClick={this.handleGoBack}
                            className="button custom-grey is-small is-rounded is-outlined"
                          >
                            <i className="fas fa-arrow-left icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-4 is-offset-4">
                      <div className="field">
                        {!loading && !data[0] && dataExport.length === 0 && (
                          <Fragment>
                            <br />
                            <div className="field">
                              <h5 className="label has-text-centered">
                                Pilih Excel (.xls, .xlsx) untuk export user
                              </h5>
                              <div className="file is-info has-name is-small is-fullwidth">
                                <label className="file-label">
                                  <input
                                    name="export-user"
                                    className="file-input"
                                    type="file"
                                    multiple={false}
                                    accept=".xls,.xlsx"
                                    onChange={(e) => this.handleExcelUpload(e)}
                                    key={this.state.inputKey}
                                  />
                                  <span className="file-cta">
                                    <span className="file-icon">
                                      <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label">
                                      Upload File
                                    </span>
                                  </span>
                                  <span className="file-name">
                                    Pilih file...
                                  </span>
                                </label>
                              </div>
                            </div>
                            <br />
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                  {dataExport && successData && (
                    <div className="columns">
                      <div className="column is-12">
                        <div className="table-container">
                          {successData.length > 0 && (
                            <table className="table is-fullwidth is-hoverable">
                              <thead className="has-background-primary">
                                <tr>
                                  <th className="has-text-white">
                                    Sukses ({successData.length})
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    {successData.map((username, i) => (
                                      <SuccessItem
                                        username={username}
                                        key={i}
                                      />
                                    ))}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {errorData.length > 0 && (
                            <Fragment>
                              <table className="table is-fullwidth is-hoverable">
                                <thead className="has-background-danger">
                                  <tr>
                                    <th className="has-text-white">
                                      Error ({errorData.length})
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {errorData.map((username, i) => (
                                        <ErrorItem
                                          username={username}
                                          key={i}
                                        />
                                      ))}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div>
                                <p className="has-text-danger is-italic is-size-7">
                                  * Username telah digunakan, pastikan username
                                  belum digunakan.
                                </p>
                              </div>
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {loading && (
                    <div>
                      <h5>Memproses...</h5>
                      <progress class="progress is-small is-info" max="100">
                        {progress}%
                      </progress>
                    </div>
                  )}
                  {!loading && dataExport.length < 1 && (
                    <div className="columns">
                      <div className="column is-12">
                        <div className="table-container">
                          <table className="table is-fullwidth is-hoverable">
                            {data && data[0] && (
                              <thead className="has-background-info">
                                <tr>
                                  <th colSpan="4" className="has-text-white">
                                    Preview ({data.length} user)
                                  </th>
                                </tr>
                              </thead>
                            )}
                            <thead>
                              {!data[0] && (
                                <tr>
                                  <th>No</th>
                                  <th>Panggilan</th>
                                  <th>Username</th>
                                  <th>Password</th>
                                </tr>
                              )}
                              {data && data[0] && (
                                <tr>
                                  {data[0] &&
                                    Object.keys(data[0]).map((col, index) => (
                                      <th key={index}>{col}</th>
                                    ))}
                                </tr>
                              )}
                            </thead>
                            <tbody>
                              {!data[0] && (
                                <tr>
                                  <td colSpan="4">Tidak Ada data</td>
                                </tr>
                              )}
                              {data && data[0] && (
                                <Fragment>
                                  {data.map((item, index) => (
                                    <Item
                                      item={item}
                                      index={index}
                                      key={index + 1}
                                    />
                                  ))}
                                </Fragment>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "userFormExport" })(UserFormExport));

export class Item extends Component {
  render() {
    const { item, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.Panggilan}</td>
        <td>{item.Username}</td>
        <td>{item.Password}</td>
      </tr>
    );
  }
}

export class ErrorItem extends Component {
  render() {
    const { username } = this.props;
    return (
      <span
        className="tag is-danger is-light"
        style={{
          marginRight: 5,
          marginBottom: 5,
        }}
      >
        {username}
      </span>
    );
  }
}

export class SuccessItem extends Component {
  render() {
    const { username } = this.props;
    return (
      <span
        className="tag is-primary is-light"
        style={{
          marginRight: 5,
          marginBottom: 5,
        }}
      >
        {username}
      </span>
    );
  }
}
