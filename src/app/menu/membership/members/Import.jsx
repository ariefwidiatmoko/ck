import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import XLSX from 'xlsx';
import { membersImp, resetImp } from './redux/reduxApi';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ImportFileInput from '../../../common/components/ImportFileInput';
import Progressbar from '../../../common/components/Progressbar'
import { format } from 'date-fns';

const mapState = (state) => ({
  auth: state.auth,
  loading: state.async.loading,
  dataImport: state.membersExIm,
});

const actions = {
  membersImp,
  resetImp,
};

class Import extends Component {
  state = {
    data: [],
    inputKey: Date.now(),
    tl: 'Anggota',
  };

  handleExcelUpload = (e) => {
    let file = e.target.files[0];

    const reader = new FileReader();
    if (file) {
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        let data = new Uint8Array(reader.result);
        let wb = XLSX.read(data, { type: 'array' });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        // Convert Array of Arrays
        const dat = XLSX.utils.sheet_to_json(ws, { header: 2 });

        this.setState({ data: dat });
      };
    }
  };

  handleImport = () => {
    const { membersImp, auth } = this.props;
    const { data } = this.state;
    membersImp(data, auth);
    this.handleCancel();
  };

  handleCancel = () => {
    const { onChange } = this.props;
    this.setState({
      data: [],
      inputKey: Date.now(),
    });
    if (onChange) onChange(null);
  };

  handleRetry = () => {
    const { onChange, resetImp } = this.props;
    this.setState({
      data: [],
      inputKey: Date.now(),
    });
    if (onChange) onChange(null);
    resetImp();
  };

  handleGoBack = () => {
    const { history, resetImp } = this.props;
    history.push('/keanggotaan/anggota');
    resetImp();
  };

  render() {
    const { loading, dataImport } = this.props;
    const { data, inputKey, tl } = this.state;
    const successData = dataImport[0];
    const errorData = dataImport[1];
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable'>
            <div className='column is-third-quarter'>
              <div className='box'>
                <form style={{ marginTop: 1 }} autoComplete='off'>
                  <div className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <nav
                          className='breadcrumb is-size-7'
                          aria-label='breadcrumbs'
                        >
                          <ul className='margin-10-25'>
                            <li>
                              <Link to='/keanggotaan/anggota'>{tl}</Link>
                            </li>
                            <li className='is-active'>
                              <Link to={`/keanggotaan/anggota/import`}>
                                Impor
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>

                    <div className='level-right'>
                      <div className='level-item'>
                        <div className='buttons'>
                          {data && data[0] && (
                            <>
                              <button
                                disabled={loading}
                                onClick={this.props.handleSubmit(
                                  this.handleImport
                                )}
                                className={
                                  loading
                                    ? 'button is-small is-primary is-rounded is-outlined is-loading'
                                    : 'button is-small is-primary is-rounded is-outlined mr-2'
                                }
                              >
                                <i className='fas fa-save icon' />
                              </button>
                              <button
                                disabled={loading}
                                onClick={this.handleCancel}
                                className='button custom-grey is-small is-rounded is-outlined'
                              >
                                <i className='fas fa-redo icon' />
                              </button>
                            </>
                          )}
                          {dataImport.length > 0 && (
                            <button
                              disabled={loading}
                              onClick={this.handleRetry}
                              className='button is-primary is-small is-rounded is-outlined'
                            >
                              <i className='fas fa-file-import icon' />
                            </button>
                          )}
                          <button
                            disabled={loading}
                            onClick={this.handleGoBack}
                            className='button custom-grey is-small is-rounded is-outlined'
                          >
                            <i className='fas fa-arrow-left icon' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='columns hero'>
                    <div className='column is-4 is-offset-4'>
                      <div className='field'>
                        {!loading && !data[0] && dataImport.length === 0 && (
                          <ImportFileInput
                            handleExcelUpload={this.handleExcelUpload}
                            inputKey={inputKey}
                            tl={tl}
                            link={'/templates/Import_Anggota_Template.xlsx'}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {dataImport && successData && (
                    <div className='columns'>
                      <div className='column is-12'>
                        <div className='table-container'>
                          {successData.length > 0 && (
                            <table className='table is-fullwidth is-hoverable'>
                              <thead className='has-background-primary'>
                                <tr>
                                  <th className='has-text-white'>
                                    Sukses ({successData.length})
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    {successData.map((username, i) => (
                                      <Success username={username} key={i} />
                                    ))}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {errorData.length > 0 && (
                            <>
                              <table className='table is-fullwidth is-hoverable'>
                                <thead className='has-background-danger'>
                                  <tr>
                                    <th className='has-text-white'>
                                      Error ({errorData.length})
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {errorData.map((username, i) => (
                                        <Error username={username} key={i} />
                                      ))}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div>
                                <p className='has-text-danger is-italic is-size-7'>
                                  * Username telah digunakan, pastikan username
                                  belum digunakan.
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {loading && (
                    <Progressbar />
                  )}
                  {!loading && dataImport.length < 1 && (
                    <div className='columns'>
                      <div className='column is-12'>
                        <div className='table-container'>
                          <table className='table is-fullwidth is-hoverable'>
                            {data && data[0] && (
                              <thead className='has-background-info'>
                                <tr>
                                  <th colSpan='11' className='has-text-white'>
                                    Preview ({data.length} {tl})
                                  </th>
                                </tr>
                              </thead>
                            )}
                            <thead>
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
                              {data && data[0] && (
                                <>
                                  {data.map((item, index) => (
                                    <Item
                                      item={item}
                                      index={index}
                                      key={index + 1}
                                    />
                                  ))}
                                </>
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
)(reduxForm({ form: 'memberImport' })(Import));

export class Item extends Component {
  render() {
    const { item, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.Panggilan}</td>
        <td>{item.Nama_Lengkap}</td>
        <td>{item.No_Telpon}</td>
        <td>{item.Jenis_Kelamin}</td>
        <td>{item.Tempat_Lahir}</td>
        <td>
          {format(
            new Date((item.Tanggal_Lahir - (25567 + 2)) * 86400 * 1000),
            'd LLLL yyyy'
          )}
        </td>
        <td>{item.Agama}</td>
        <td>{item.Status_Kawin}</td>
        <td>{item.Pekerjaan}</td>
        <td>{item.Alamat}</td>
      </tr>
    );
  }
}

export class Error extends Component {
  render() {
    const { username } = this.props;
    return (
      <span
        className='tag is-danger is-light'
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

export class Success extends Component {
  render() {
    const { username } = this.props;
    return (
      <span
        className='tag is-primary is-light'
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
