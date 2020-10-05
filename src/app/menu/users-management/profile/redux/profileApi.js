import { profileUpdate } from './profileAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { authUpdate } from '../../../login/redux/authAction';
import { openModal } from '../../../modals/redux/modalActions';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';
// url: "/profile/:userId"
export const profileView = (userId, token) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'profileView' });
    try {
      const fetchData = await fetch(SITE_ADDRESS + 'api/profile/' + userId, {
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
        const error = new Error(response.message);
        throw error;
      }
      const user = response.user;
      const getHobbies = user.profile.arrHobbies;
      const arrHobbies = getHobbies ? getHobbies.split(',') : [];
      const username = user.username;
      const objProfile = {
        arrHobbies: arrHobbies,
        username: username,
      };
      const profile = user.profile;
      const updatedProfile = {
        ...profile,
        ...objProfile,
      };
      dispatch(profileUpdate(updatedProfile));
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
// url: "/profile/:userId/[basic,about]"
export const profileEdit = (profile, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'profileUpdate' });
    const formData = new FormData();
    const arr = Object.entries(profile);
    for (const [key, value] of arr) {
      if (key !== 'dob' && key !== 'arrHobbies' && key !== 'updatedBy') {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    const dob = profile.dob;
    if (dob !== null) {
      formData.append('dob', dob);
    }
    formData.append('arrHobbies', profile.arrHobbies.toString());
    if (profile.religion && profile.religion !== 'other') {
      formData.append('religionDetail', '');
    }
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/profile/edit/' + profile.userId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
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
      const user = response.user;
      const gethobbies = user.profile.arrHobbies;
      const arrHobbies = gethobbies ? gethobbies.split(',') : [];
      const objProfile = {
        arrHobbies: arrHobbies,
      };
      const oldProfile = user.profile;
      const newProfile = {
        ...oldProfile,
        ...objProfile,
      };
      const newAuth = {
        name: user.profile.name,
        mainPhoto: user.profile.mainPhoto,
      };
      dispatch(profileUpdate(newProfile));
      dispatch(authUpdate(newAuth));
      toastr.success('Sukses', 'Update profil');
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
// url: "/profile/:userId/[pictures]"
export const profilePhotoUpload = (file, filename, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'profilePhotoUpload' });
    const userId = auth.userId;
    const token = auth.token;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/profile/picture-upload/' + userId,
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
      let profile = response.profile;
      let mainPhoto = profile.mainPhoto;
      let arrPhotos = profile.arrPhotos;
      let newProfile = { mainPhoto: mainPhoto, arrPhotos: arrPhotos };
      dispatch(authUpdate({ mainPhoto: mainPhoto }));
      dispatch(profileUpdate(newProfile));
      toastr.success('Sukses', 'Upload foto');
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
// url: "/profile/:userId/[pictures]"
export const profileMainPhotoSet = (photo, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'profileMainPhotoSet' });
    const userId = auth.userId;
    const token = auth.token;
    const formData = new FormData();
    formData.append('mainPhoto', photo);
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/profile/edit/' + userId, {
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
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      let profile = response.user.profile;
      let mainPhoto = profile.mainPhoto;
      let newProfile = { mainPhoto: mainPhoto };
      dispatch(authUpdate({ mainPhoto: mainPhoto }));
      dispatch(profileUpdate(newProfile));
      toastr.success('Sukses', 'Update foto profil');
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
// url: "/profile/:userId/[pictures]"
export const profilePhotoDelete = (photo, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'profilePhotoDelete' });
    const userId = auth.userId;
    const token = auth.token;
    const formData = new FormData();
    formData.append('photo', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/profile/picture-delete/' + userId,
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
      let profile = response.profile;
      let arrPhotos = profile.arrPhotos;
      let newProfile = { arrPhotos: arrPhotos };
      dispatch(profileUpdate(newProfile));
      toastr.success('Sukses', 'Hapus foto');
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
// url: "/profile/password-reset/:userId"
export const profilePasswordReset = (user, auth) => {
  return async (dispatch) => {
    let userId = user.id;
    dispatch({ type: ASYNC_ACTION_START, payload: 'profilePasswordReset' });
    const formData = new FormData();
    formData.append('password', user.resetPassword);
    formData.append('updatedBy', user.updatedBy);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/profile/password-reset/' + userId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + auth.token,
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
      toastr.success('Sukses', 'Reset password');
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
