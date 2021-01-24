import {
  usersGet,
  userCreate,
  userProfileUpdate,
  userDelete,
  userRestore,
  userHardDel,
  usersImport,
} from './reduxAction';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { rolesGet } from '../../Roles/redux/reduxAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';
import { authUpdate, authLogout } from '../../../login/redux/authAction';
import { checkRes, checkErr } from '../../../../common/helpers/checkRes';
// url: "/pengaturan-user/user"
export const usersIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'usersIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/users', {
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
      dispatch(detailsItem({ id: 'user', total: response.total }));
      dispatch(usersGet(response.users));
      dispatch(rolesGet(response.roles));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/userFormEditRole"
export const userRolesIndex = (token) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userRolesIndex' });
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/users/roles', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      dispatch(rolesGet(response.roles));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/edit/:userId"
export const userView = (id, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userView' });
    try {
      const fetchData = await fetch(SITE_ADDRESS + 'api/users/' + id, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const user = response.user;
      const roles =
        user.roles && user.roles.length > 0 ? user.roles.split(',') : [];
      user.roles = roles;
      const getHobbies = user.profile.hobbies;
      const hobbies = getHobbies ? getHobbies.split(',') : [];
      const dob = user.profile.dob;
      const createdAt = user.profile.createdAt;
      const updatedAt = user.profile.updatedAt;
      const objProfile = {
        hobbies: hobbies,
        dob: dob,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
      const profile = user.profile;
      const updateProfile = {
        ...profile,
        ...objProfile,
      };
      user.profile = updateProfile;
      dispatch(userProfileUpdate(user));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/tambah"
export const userAdd = (values, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userAdd' });
    const actionBy = auth.username;
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('name', values.name);
    formData.append('password', values.password);
    formData.append('actionBy', actionBy);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/users/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 201);
      if (resultCheck) {
        throw resultCheck;
      }
      const user = response.user;
      const getHobbies = user.profile.hobbies;
      const hobbies = getHobbies ? getHobbies.split(',') : [];
      const objProfile = {
        hobbies: hobbies,
      };
      const profile = user.profile;
      const updateProfile = {
        ...profile,
        ...objProfile,
      };
      user.profile = updateProfile;
      dispatch(userCreate(user));
      dispatch(asyncActionFinish());
      history.push(`/pengaturan-user/user/detail/${response.user.id}`);
      toastr.success('Sukses', 'User telah dibuat');
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/edit/:userId"
export const userEdit = (values, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userEdit' });
    const id = values.id;
    const actionBy = auth.username;
    const formData = new FormData();
    formData.append('actionBy', actionBy);
    const obj = Object.entries(values);
    for (const [key, value] of obj) {
      if (key !== 'dob' && key !== 'hobbies' && key !== 'logs') {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    const dob = values.dob;
    if (dob !== null) {
      formData.append('dob', dob);
    }
    const hobbies = values.hobbies;
    if (hobbies !== null) {
      formData.append('hobbies', hobbies);
    }
    if (values.religion !== 'Lainnya') {
      formData.append('religionDetail', '');
    }
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/users/edit/' + id, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      let user = response.user;
      dispatch(userProfileUpdate(user));
      if (auth.userId + '' === user.id + '') {
        const setAuth = { name: user.profile.name };
        dispatch(authUpdate(setAuth));
      }
      toastr.success('Sukses', 'Profil user telah diupdate');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/edit/:userId"
export const userAccountEdit = (account, auth) => {
  return async (dispatch) => {
    const userId = account.id;
    dispatch({ type: ASYNC_ACTION_START, payload: 'userAccountEdit' });
    const formData = new FormData();
    formData.append('username', account.username);
    if (account.resetPassword) {
      formData.append('resetPassword', account.resetPassword);
    }
    formData.append('updatedBy', account.updatedBy);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/users/account-edit/' + userId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const user = response.user;
      const profile = response.profile;
      const getHobbies = profile.hobbies;
      const hobbies = getHobbies ? getHobbies.split(',') : [];
      const dob = profile.dob;
      const createdAt = profile.createdAt;
      const updatedAt = profile.updatedAt;
      const objProfile = {
        hobbies: hobbies,
        dob: dob,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
      const updateProfile = {
        ...profile,
        ...objProfile,
      };
      const updateUser = { ...user, ...{ profile: updateProfile } };
      // updateUser.profile = updateProfile;
      dispatch(userProfileUpdate(updateUser));
      if (user.id + '' === auth.userId + '') {
        const setUser = { username: user.username };
        dispatch(authUpdate(setUser));
      }
      toastr.success('Sukses', 'Akun user telah diupdate');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
//url: "/pengaturan-user/user/userFormEditRole"
export const userRoleEdit = (role, userId, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userRoleEdit' });
    try {
      const roles = role.toString().length >= 0 ? role.toString() : '';
      const formData = new FormData();
      const actionBy = auth.username;
      formData.append('roles', roles);
      formData.append('actionBy', actionBy);
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/users/role-edit/' + userId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const user = response.user;
      const profile = response.profile;
      const getHobbies = profile.hobbies;
      const hobbies = getHobbies ? getHobbies.split(',') : [];
      const dob = profile.dob;
      const createdAt = profile.createdAt;
      const updatedAt = profile.updatedAt;
      const objProfile = {
        hobbies: hobbies,
        dob: dob,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
      const updateProfile = {
        ...profile,
        ...objProfile,
      };
      user.profile = updateProfile;
      let addNotif = '';
      if (user.id + '' === auth.userId + '') {
        dispatch(authLogout());
        history.push('/');
        addNotif = ', Anda perlu login lagi!';
      } else {
        dispatch(userProfileUpdate(user));
      }
      toastr.success('Sukses', 'Role user telah diupdate' + addNotif);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user"
export const userDel = (userId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userDelete' });
    try {
      const formData = new FormData();
      const actionBy = auth.username;
      formData.append('actionBy', actionBy);
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/users/delete/' + userId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const user = response.user;
      dispatch(detailsItem({ id: 'user', total: total - 1 }));
      dispatch(userDelete(user.id));
      toastr.success('Sukses', `${user.username} telah dihapus`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/pengaturan-user/user/[modal: Restore]'
export const userRes = (id, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userRes' });
    const formData = new FormData();
    const actionBy = auth.username;
    formData.append('actionBy', actionBy);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/users/restore/' + id, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const user = response.user;
      dispatch(detailsItem({ id: 'user', total: total - 1 }));
      dispatch(userRestore(user.id));
      toastr.success('Sukses', `${user.username} telah direstore`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/pengaturan-user/user/[modal: HardDel]'
export const userHDel = (id, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'userHDel' });
    const formData = new FormData();
    const actionBy = auth.username;
    formData.append('actionBy', actionBy);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/users/hard-delete/' + id,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const user = response.user;
      dispatch(detailsItem({ id: 'user', total: total - 1 }));
      dispatch(userHardDel(user.id));
      toastr.success('Sukses', `${user.username} telah dihapus`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/import"
export const usersImp = (data, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'usersImport' });
    try {
      const usersData = JSON.stringify(data);
      const formData = new FormData();
      formData.append('users', usersData);
      formData.append('actionBy', auth.username);
      const fetchData = await fetch(SITE_ADDRESS + 'api/users/import', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 201);
      if (resultCheck) {
        throw resultCheck;
      }
      const dataSuccess = response.usersSuccess;
      const dataError = response.usersError;
      dispatch(usersImport([dataSuccess, dataError]));
      let addNotif = '';
      if (dataError.length > 0) {
        addNotif = ', tapi ditemukan duplikasi';
      }
      toastr.success('Sukses', 'Import user selesai' + addNotif);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/import"
export const resetImp = () => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'resetImport' });
    try {
      dispatch(usersImport([]));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  };
};
