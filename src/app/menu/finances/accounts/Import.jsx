import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import XLSX from 'xlsx';
import { accountsImp, resetImp } from './redux/reduxApi';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ImportFileInput from '../../../common/components/ImportFileInput';

const mapState = (state) => ({
  auth: state.auth,
  loading: state.async.loading,
  progress: state.progress,
  dataImport: state.accountsExIm,
});

const actions = {
  accountsImp,
  resetImp,
};

class Import extends Component {
  state = {
    data: [],
    inputKey: Date.now(),
    tl: 'Akun',
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
    const { accountsImp, auth } = this.props;
    const { data } = this.state;
    accountsImp(data, auth);
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
    history.push('/keuangan/akun');
    resetImp();
  };

  render() {
    const { loading, dataImport, progress } = this.props;
    const { data, inputKey, tl } = this.state;
    const successData = dataImport[0];
    const errorData = dataImport[1];
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable'>
            <div className='column is-third-quarter'>
              <div className='box'>
                <form autoComplete='off'>
                  <div className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <nav
                          className='breadcrumb is-size-7'
                          aria-label='breadcrumbs'
                        >
                          <ul className='margin-10-25'>
                            <li>
                              <Link to='/keuangan/akun'>{tl}</Link>
                            </li>
                            <li className='is-active'>
                              <Link to={`/keuangan/akun/import`}>Import</Link>
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
                            link={'/templates/Import_Akun_Template.xlsx'}
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
                                    {successData.map((name, i) => (
                                      <Success name={name} key={i} />
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
                                      {errorData.map((name, i) => (
                                        <Error name={name} key={i} />
                                      ))}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div>
                                <p className='has-text-danger is-italic is-size-7'>
                                  * Kode akun telah digunakan, pastikan kode
                                  akun belum digunakan.
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {loading && (
                    <div>
                      <h5>Memproses...</h5>
                      <progress className='progress is-small is-info' max='100'>
                        {progress}%
                      </progress>
                    </div>
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
                              <tr>
                                <th className='has-text-centered'>No</th>
                                <th className='has-text-centered'>Kode</th>
                                <th className='has-text-centered'>Akun</th>
                                <th className='has-text-centered'>H / D</th>
                                <th className='has-text-centered'>Tipe</th>
                                <th className='has-text-centered'>Level</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!data[0] && (
                                <tr>
                                  <td colSpan='4'>Tidak Ada data</td>
                                </tr>
                              )}
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
)(reduxForm({ form: 'accountImport' })(Import));

export class Item extends Component {
  render() {
    const { item, index } = this.props;
    return (
      <tr>
        <td className='has-text-centered'>{index + 1}</td>
        <td>{item.Kode}</td>
        <td><p className={item.Header_Detail === 'Header' ? item.Level === 1 ? 'has-text-weight-semibold' : 'has-text-weight-medium ml-3' : 'ml-5'}>{item.Akun}</p></td>
        <td className='has-text-centered'>{item.Header_Detail}</td>
        <td className='has-text-centered'>{item.Tipe}</td>
        <td className='has-text-centered'>{item.Level}</td>
      </tr>
    );
  }
}

export class Error extends Component {
  render() {
    const { name } = this.props;
    return (
      <span
        className='tag is-danger is-light'
        style={{
          marginRight: 5,
          marginBottom: 5,
        }}
      >
        {name}
      </span>
    );
  }
}

export class Success extends Component {
  render() {
    const { name } = this.props;
    return (
      <span
        className='tag is-primary is-light'
        style={{
          marginRight: 5,
          marginBottom: 5,
        }}
      >
        {name}
      </span>
    );
  }
}
