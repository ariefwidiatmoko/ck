import React, {
  Component,
  // Fragment,
} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { recyclebinsFetch } from './redux/reduxApi';
import LoadingButton from '../../main/LoadingButton';
import RecyclebinList from './Lists/Lists';
import { compose } from 'redux';

const mapState = (state) => {
  let aS = {};
  if (state.auth) {
    aS = state.auth.arrAuth.detail.subm.filter((i) => i.id === 'users')[0];
  }
  return {
    recyclebins: state.recyclebins,
    auth: state.auth,
    aS: aS,
    loading: state.async.loading,
  };
};

const actions = {
  recyclebinsFetch,
};

class Index extends Component {
  componentDidMount = () => {
    this.props.recyclebinsFetch(this.props.auth.token);
  };
  render() {
    const { recyclebins, auth, aS, loading } = this.props;
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable'>
            <div className='column'>
              <div className='box'>
                <nav className='breadcrumb' aria-label='breadcrumbs'>
                  <ul className='margin-10-25'>
                    <li className='is-active'>
                      <Link to='/recyclebin'>Recycle Bin</Link>
                    </li>
                    <li className='is-active'>
                      <Link to='/recyclebin'>Index</Link>
                    </li>
                  </ul>
                </nav>
                <div className='columns'>
                  <div className='column is-fullwidth'>
                    <div className='box'>
                      <div className='level'>
                        <div className='level-left'>
                          <div className='level-item'>
                            <div className='field has-addons'>
                              <p className='control'>
                                <input
                                  className='input is-small is-rounded'
                                  type='text'
                                  placeholder='Search user'
                                />
                              </p>
                              <p className='control'>
                                <button className='button is-small is-link is-rounded is-outlined'>
                                  <i className='fas fa-search' />
                                </button>
                              </p>
                            </div>
                          </div>
                          <div className='level-item'>
                            <div className='field has-addons'>
                              <div className='control'>
                                <div className='button is-small is-rounded is-primary is-outlined'>
                                  <span className='icon is-small'>
                                    <i className='fas fa-chevron-left' />
                                  </span>
                                </div>
                              </div>
                              <div className='control'>
                                <div className='button is-small is-disabled'>
                                  <span>50-100 of 2000 Item</span>
                                </div>
                              </div>
                              <div className='control'>
                                <div className='button is-small is-rounded is-primary is-outlined'>
                                  <span className='icon is-small'>
                                    <i className='fas fa-chevron-right' />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='level-right'>
                          <div className='level-item'>
                            <div className='select is-small is-rounded'>
                              <select>
                                <option>Semua Item</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='table-container'>
                        <table className='table is-fullwidth is-hoverable'>
                          <thead>
                            <tr>
                              <th className='has-text-centered'>No</th>
                              <th className='has-text-centered'>Item ID</th>
                              <th className='has-text-centered'>Kategori</th>
                              <th>Data</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading === true ? (
                              <tr>
                                <td>
                                  <LoadingButton />
                                </td>
                              </tr>
                            ) : (
                              <RecyclebinList
                                recyclebins={recyclebins}
                                auth={auth}
                                aS={aS}
                              />
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className='select is-small is-rounded'>
                        <select>
                          <option>10</option>
                          <option>20</option>
                          <option>50</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withRouter, connect(mapState, actions))(Index);
