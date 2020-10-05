import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { roleNew, roleEdit } from './redux/rolesApi';
import FormInput from './FormInput';

const mapState = (state, ownProps) => {
  const roleId = ownProps.match.params.id;
  let role = {};

  if (state.roles && state.roles.length > 0) {
    role = state.roles.filter((role) => role.id === Number(roleId))[0];
  }
  return {
    menus: state.menus,
    auth: state.auth,
    role: role,
    loading: state.async.loading,
  };
};

const actions = {
  roleNew,
  roleEdit,
};

class Form extends Component {
  state = {
    roleId: this.props.match.params.id,
  };

  objFn = () => {
    const { menus } = this.props;
    let dataState = {};
    const dataM = [];
    const dataSubm = [];
    const dataAc = [];
    menus.forEach((m) => {
      dataState[m.id] = false;
      dataM.push(m.id);
      if (m.subm.length > 0) {
        m.subm.forEach((subm) => {
          let dataState1 = { [subm.id]: false };
          let dataState2 = { [subm.id + '_c']: false };
          let dataState3 = { [subm.id + '_u']: false };
          let dataState4 = { [subm.id + '_d']: false };
          let dataState5 = { [subm.id + '_r']: false };
          let dataState6 = { [subm.id + '_h']: false };
          let dataState7 = { [subm.id + '_e']: false };
          let dataState8 = { [subm.id + '_i']: false };
          dataState = {
            ...dataState,
            ...dataState1,
            ...dataState2,
            ...dataState3,
            ...dataState4,
            ...dataState5,
            ...dataState6,
            ...dataState7,
            ...dataState8,
          };
          dataSubm.push(subm.id);
          dataAc.push(subm.id + '_c');
          dataAc.push(subm.id + '_u');
          dataAc.push(subm.id + '_d');
          dataAc.push(subm.id + '_r');
          dataAc.push(subm.id + '_h');
          dataAc.push(subm.id + '_e');
          dataAc.push(subm.id + '_i');
        });
      } else {
        let dataState5 = { [m.id]: false };
        let dataState6 = { [m.id + '_c']: false };
        let dataState7 = { [m.id + '_u']: false };
        let dataState8 = { [m.id + '_d']: false };
        let dataState9 = { [m.id + '_r']: false };
        let dataState10 = { [m.id + '_h']: false };
        let dataState11 = { [m.id + '_e']: false };
        let dataState12 = { [m.id + '_i']: false };
        dataState = {
          ...dataState,
          ...dataState5,
          ...dataState6,
          ...dataState7,
          ...dataState8,
          ...dataState9,
          ...dataState10,
          ...dataState11,
          ...dataState12,
        };
      }
    });
    dataState.roleName = null;
    dataState.dataM = dataM;
    dataState.dataSubm = dataSubm;
    dataState.dataAc = dataAc;
    return dataState;
  };

  render() {
    const {
      auth,
      menus,
      history,
      roleNew,
      roleEdit,
      loading,
      role,
    } = this.props;
    const { roleId } = this.state;
    return (
      <div className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'>
        <div className='p-1'>
          <div className='columns is-variable'>
            <div className='column is-fullwidth'>
              <FormInput
                Link={Link}
                auth={auth}
                roleNew={roleNew}
                roleEdit={roleEdit}
                history={history}
                loading={loading}
                roleId={roleId}
                initialValues={roleId ? role : {}}
                role={role}
                menus={menus}
                dataState={this.objFn}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapState, actions)(Form));
