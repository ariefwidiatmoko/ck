import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { rolesGet, roleCreate, roleUpdate } from './reduxAction';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';
import { authLogout } from '../../../login/redux/authAction';
import { checkRes, checkErr } from '../../../../common/helpers/checkRes';

export const rolesIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'rolesIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      let fetchData = await fetch(SITE_ADDRESS + 'api/roles', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      dispatch(detailsItem({ id: 'role', total: response.total }));
      dispatch(rolesGet(response.roles));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const roleAdd = (name, m, subm, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'roleAdd' });
    let token = auth.token;
    let authDetails = [m, subm];
    let authorities = JSON.stringify(authDetails);
    const actionBy = auth.username;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('authorities', authorities);
    formData.append('actionBy', actionBy);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/roles/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 201);
      if (resultCheck) {
        throw resultCheck;
      }
      const role = response.role;
      dispatch(roleCreate(role));
      toastr.success('Sukses', 'Role telah dibuat');
      history.push('/pengaturan-user/role/edit/' + role.id);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const roleEdit = (roleId, name, m, subm, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'roleEdit' });
    const token = auth.token;
    const authDetails = [m, subm];
    const authorities = JSON.stringify(authDetails);
    const actionBy = auth.username
    const formData = new FormData();
    formData.append('name', name);
    formData.append('authorities', authorities);
    formData.append('actionBy',actionBy);
    try {
      const fetchData = await fetch(SITE_ADDRESS + 'api/roles/update/' + roleId, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 201);
      if (resultCheck) {
        throw resultCheck;
      }
      dispatch(roleUpdate(response.role));
      const roleFilter = auth.authorities.roles.filter((role) => {
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
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
