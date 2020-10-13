import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { rolesGet, roleCreate, roleUpdate } from './rolesAction';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { openModal } from '../../../modals/redux/modalActions';
import { authLogout } from '../../../login/redux/authAction';

export const rolesFetch = (token) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'getRoles' });
    try {
      let fetchData = await fetch('http://localhost:3000/api/roles', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      if (response.message === 'jwt expired') {
        dispatch(openModal('SessionEndModal'));
        const error = new Error('jwt expired');
        throw error;
      }
      if (fetchData.status !== 200) {
        throw new Error('Failed to fetch status');
      }
      dispatch(rolesGet(response.roles));
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === 'jwt expired') {
        console.log(error);
      } else {
        console.log(error);
        toastr.error('Error', `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};

export const roleNew = (roleName, m, subm, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'addRole' });
    let token = auth.token;
    let authorities = [m, subm];
    let arrAuthorities = JSON.stringify(authorities);
    const formData = new FormData();
    formData.append('roleName', roleName);
    formData.append('arrAuthorities', arrAuthorities);
    formData.append('createdBy', auth.userId);
    try {
      let fetchData = await fetch('http://localhost:3000/api/roles/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      if (response.message === 'jwt expired') {
        dispatch(openModal('SessionEndModal'));
        const error = new Error('jwt expired');
        throw error;
      }
      if (fetchData.status !== 201) {
        const error = new Error(response.message);
        throw error;
      }
      dispatch(roleCreate(response.role));
      toastr.success('Sukses', 'Role telah dibuat');
      history.push('/pengaturan-user/role/edit/' + response.role.id);
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === 'jwt expired') {
        console.log(error);
      } else {
        console.log(error);
        toastr.error('Error', `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};

export const roleEdit = (roleId, roleName, m, subm, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'editRole' });
    let token = auth.token;
    let authorities = [m, subm];
    let arrAuthorities = JSON.stringify(authorities);
    const formData = new FormData();
    formData.append('roleName', roleName);
    formData.append('arrAuthorities', arrAuthorities);
    formData.append('updatedBy', auth.userId);
    try {
      let fetchData = await fetch(
        'http://localhost:3000/api/roles/update/' + roleId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === 'jwt expired') {
        dispatch(openModal('SessionEndModal'));
        const error = new Error('jwt expired');
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      dispatch(roleUpdate(response.role));
      const roleFilter = auth.arrAuth.arrRoles.filter((role) => {
        return role + '' === response.role.id + '';
      })[0];
      let addNotif = '';
      if (roleFilter) {
        dispatch(authLogout());
        history.push('/');
        addNotif = ', Anda perlu login lagi!';
      } else {
        history.push('/pengaturan-user/role/edit/' + response.role.id);
      }
      toastr.success('Sukses', 'Role telah diupdate' + addNotif);
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === 'jwt expired') {
        console.log(error);
      } else {
        console.log(error);
        toastr.error('Error', `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
