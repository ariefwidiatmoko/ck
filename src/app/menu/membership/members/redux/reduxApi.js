import {
  membersGet,
  memberCreate,
  memberUpdate,
  memberDelete,
  memberRestore,
  memberHardDel,
  membersImport,
} from './reduxAction';
import { detailsItem } from '../../../pages/details/redux/detailsAction';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionFinish,
  asyncActionError,
} from '../../../../async/asyncActions';
import { ASYNC_ACTION_START } from '../../../../async/asyncConstant';
import { SITE_ADDRESS } from '../../../../common/util/siteConfig';
import { checkRes, checkErr } from '../../../../common/helpers/checkRes';

// url: /keanggotaan/anggota
export const membersIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'membersIndex' });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append('number', number);
      formData.append('page', cp);
      formData.append('search', st);
      const fetchData = await fetch(SITE_ADDRESS + 'api/members', {
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
      dispatch(detailsItem({ id: 'anggota', total: response.total }));
      dispatch(membersGet(response.members));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/anggota/tambah"
export const memberAdd = (member, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberAdd' });
    const formData = new FormData();
    const arr = Object.entries(member);
    for (const [key, value] of arr) {
      if (key !== 'joinDate' && key !== 'dob') {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    if (member.joinDate) {
      const joinDate = member.joinDate.toISOString();
      formData.append('joinDate', joinDate);
    }
    if (member.dob) {
      const dob = member.dob.toISOString();
      formData.append('dob', dob);
    }
    try {
      let fetchData = await fetch(SITE_ADDRESS + 'api/members/create', {
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
      const member = response.member;
      dispatch(memberCreate(member));
      dispatch(asyncActionFinish());
      history.push(`/keanggotaan/anggota/detail/${response.member.code}`);
      toastr.success('Sukses', 'Anggota telah dibuat');
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keanggotaan/anggota/detail/:memberId'
export const memberView = (memberId, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberView' });
    try {
      const fetchData = await fetch(SITE_ADDRESS + 'api/members/' + memberId, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      });
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      const member = response.member;
      dispatch(memberUpdate(member));
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/anggota/edit/:memberId"
export const memberEdit = (values, auth, memberId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberEdit' });
    const formData = new FormData();
    const arr = Object.entries(values);
    for (const [key, value] of arr) {
      if (key !== 'joinDate' && key !== 'dob' && key !== 'updatedBy') {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    if (values.joinDate) {
      const joinDate =
        typeof values.joinDate !== 'string'
          ? values.joinDate.toISOString()
          : values.joinDate;
      formData.append('joinDate', joinDate);
    }
    if (values.dob) {
      const dob =
        typeof values.dob !== 'string' ? values.dob.toISOString() : values.dob;
      formData.append('dob', dob);
    }
    formData.append('updatedBy', auth.userId);
    try {
      const fetchData = await fetch(
        SITE_ADDRESS + 'api/members/edit/' + memberId,
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
      const member = response.member;
      dispatch(memberUpdate(member));
      toastr.success('Sukses', `Update Anggota.`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const memberPhotoUpload = (file, filename, auth, memberId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberPhotoUpload' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/members/photo-upload/' + memberId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      let member = response.member;
      dispatch(memberUpdate(member));
      toastr.success('Sukses', 'Profil foto tersimpan');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const memberMainPhotoSet = (memberId, photo, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberMainPhotoSet' });
    const formData = new FormData();
    formData.append('mainPhoto', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/members/edit/' + memberId,
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
      let member = response.member;
      dispatch(memberUpdate(member));
      toastr.success('Sukses', 'Update foto profil');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};

export const memberPhotoDelete = (photo, auth, memberId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberPhotoDelete' });
    const token = auth.token;
    const formData = new FormData();
    formData.append('photo', photo);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/members/photo-delete/' + memberId,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const response = await fetchData.json();
      const resultCheck = checkRes(response, fetchData, dispatch, 200);
      if (resultCheck) {
        throw resultCheck;
      }
      let member = response.member;
      dispatch(memberUpdate(member));
      toastr.success('Sukses', 'Hapus foto');
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keanggotaan/anggota/[modal: Delete]'
export const memberDel = (memberId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/members/delete/' + memberId,
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
      const member = response.member;
      dispatch(detailsItem({ id: 'anggota', total: total - 1 }));
      dispatch(memberDelete(member.id));
      toastr.success('Sukses', `${member.code} - ${member.name} telah dihapus`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keanggotaan/anggota/[modal: Restore]'
export const memberRes = (memberId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/members/restore/' + memberId,
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
      const member = response.member;
      dispatch(detailsItem({ id: 'anggota', total: total - 1 }));
      dispatch(memberRestore(member.id));
      toastr.success(
        'Sukses',
        `${member.code} - ${member.name} telah direstore`
      );
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keanggotaan/anggota/[modal: HardDel]'
export const memberHDel = (memberId, auth, total) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'memberHDel' });
    const formData = new FormData();
    const userId = auth.userId;
    formData.append('userId', userId);
    try {
      let fetchData = await fetch(
        SITE_ADDRESS + 'api/members/hard-delete/' + memberId,
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
      const member = response.member;
      dispatch(detailsItem({ id: 'anggota', total: total - 1 }));
      dispatch(memberHardDel(member.id));
      toastr.success('Sukses', `${member.code} - ${member.name} telah dihapus`);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: '/keanggotaan/anggota/import'
export const membersImp = (data, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: 'membersImport' });
    try {
      const membersData = JSON.stringify(data);
      const logs = [
        {
          action: 'create',
          user: { id: auth.userId, username: auth.username },
          time: new Date().toISOString(),
        },
      ];
      const formData = new FormData();
      formData.append('members', membersData);
      formData.append('logs', JSON.stringify(logs));
      const fetchData = await fetch(SITE_ADDRESS + 'api/members/import', {
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
      const dataSuccess = response.membersSuccess;
      const dataError = response.membersError;
      dispatch(membersImport([dataSuccess, dataError]));
      let addNotif = '';
      if (dataError.length > 0) {
        addNotif = ', tapi ditemukan duplikasi';
      }
      toastr.success('Sukses', 'Import anggota selesai' + addNotif);
      dispatch(asyncActionFinish());
    } catch (error) {
      checkErr(error);
      dispatch(asyncActionError());
    }
  };
};
// url: "/keanggotaan/anggota/import"
export const resetImp = () => {
  return async (dispatch) => {
    try {
      dispatch(membersImport([]));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  };
};
