import {
  usersGet,
  userCreate,
  userProfileUpdate,
  userDelete,
  usersExport,
} from "./reduxAction";
import { detailsItem } from "../../../pages/details/redux/detailsAction";
import { progressPercent } from "../../../pages/progress/redux/progressAction";
import { randomNumber } from "../../../../common/helpers/othersHelpers";
import { rolesGet } from "../../Roles/redux/rolesAction";
import { toastr } from "react-redux-toastr";
import {
  asyncActionFinish,
  asyncActionError,
} from "../../../../async/asyncActions";
import { ASYNC_ACTION_START } from "../../../../async/asyncConstant";
import { openModal } from "../../../modals/redux/modalActions";
import { authUpdate, authLogout } from "../../../login/redux/authAction";
// url: "/pengaturan-user/user"
export const usersFetch = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "usersFetch" });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append("number", number);
      formData.append("page", cp);
      formData.append("search", st);
      const fetchData = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      dispatch(detailsItem({ id: "user", total: response.totals }));
      dispatch(usersGet(response.users));
      dispatch(rolesGet(response.roles));
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/userFormEditRole"
export const userRolesFetch = (token) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "getRoles" });
    try {
      let fetchData = await fetch("http://localhost:3000/api/users/roles", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      dispatch(rolesGet(response.roles));
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/edit/:userId"
export const userFetch = (userId, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "userFetch" });
    try {
      const fetchData = await fetch(
        "http://localhost:3000/api/users/" + userId,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const user = response.user;
      const arrRoles =
        user.arrRoles && user.arrRoles.length > 0
          ? user.arrRoles.split(",")
          : [];
      user.arrRoles = arrRoles;
      const getHobbies = user.profile.arrHobbies;
      const arrHobbies = getHobbies ? getHobbies.split(",") : [];
      const dob = user.profile.dob;
      const createdAt = user.profile.createdAt;
      const updatedAt = user.profile.updatedAt;
      const objProfile = {
        arrHobbies: arrHobbies,
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
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/tambah"
export const userNew = (user, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "userNew" });
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("name", user.name);
    formData.append("password", user.password);
    formData.append("createdBy", auth.userId);
    try {
      let fetchData = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 201) {
        const error = new Error(response.message);
        throw error;
      }
      const user = response.user;
      const getHobbies = user.profile.arrHobbies;
      const arrHobbies = getHobbies ? getHobbies.split(",") : [];
      const dob = user.profile.dob;
      const createdAt = user.profile.createdAt;
      const updatedAt = user.profile.updatedAt;
      const objProfile = {
        arrHobbies: arrHobbies,
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
      dispatch(userCreate(user));
      dispatch(asyncActionFinish());
      history.push(`/pengaturan-user/user/detail/${response.user.id}`);
      toastr.success("Sukses", "User telah dibuat");
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/edit/:userId"
export const userEdit = (userProfile, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "userEdit" });
    const formData = new FormData();
    const arr = Object.entries(userProfile);
    for (const [key, value] of arr) {
      if (key !== "dob" && key !== "arrHobbies" && key !== "updatedBy") {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    const dob = userProfile.dob;
    if (dob !== null) {
      formData.append("dob", dob);
    }
    const arrHobbies = userProfile.arrHobbies.toString();
    formData.append("arrHobbies", arrHobbies);
    if (userProfile.religion && userProfile.religion !== "other") {
      formData.append("religionDetail", "");
    }
    formData.append("updatedBy", auth.userId);
    try {
      let fetchData = await fetch(
        "http://localhost:3000/api/users/edit/" + userProfile.id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      let user = response.user;
      let getHobbies = user.profile.arrHobbies;
      let arrHobbies = getHobbies ? getHobbies.split(",") : [];
      let dob = user.profile.dob;
      let createdAt = user.profile.createdAt;
      let updatedAt = user.profile.updatedAt;
      let objProfile = {
        arrHobbies: arrHobbies,
        dob: dob,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
      let profile = user.profile;
      let updateProfile = {
        ...profile,
        ...objProfile,
      };
      user.profile = updateProfile;
      dispatch(userProfileUpdate(user));
      if (auth.userId + "" === user.id + "") {
        const setAuth = { name: user.profile.name };
        dispatch(authUpdate(setAuth));
      }
      toastr.success("Sukses", "Profil user telah diupdate");
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/edit/:userId"
export const userAccountEdit = (account, auth) => {
  return async (dispatch) => {
    const userId = account.id;
    dispatch({ type: ASYNC_ACTION_START, payload: "userAccountEdit" });
    const formData = new FormData();
    formData.append("username", account.username);
    if (account.resetPassword) {
      formData.append("resetPassword", account.resetPassword);
    }
    formData.append("updatedBy", account.updatedBy);
    try {
      const fetchData = await fetch(
        "http://localhost:3000/api/users/account-edit/" + userId,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const user = response.user;
      const profile = response.profile;
      const getHobbies = profile.arrHobbies;
      const arrHobbies = getHobbies ? getHobbies.split(",") : [];
      const dob = profile.dob;
      const createdAt = profile.createdAt;
      const updatedAt = profile.updatedAt;
      const objProfile = {
        arrHobbies: arrHobbies,
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
      if (user.id + "" === auth.userId + "") {
        const setUser = { username: user.username };
        dispatch(authUpdate(setUser));
      }
      toastr.success("Sukses", "Akun user telah diupdate");
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
//url: "/pengaturan-user/user/userFormEditRole"
export const userRoleEdit = (role, userId, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "userRoleEdit" });
    try {
      const arrRoles = role.toString().length >= 0 ? role.toString() : "";
      const formData = new FormData();
      formData.append("arrRoles", arrRoles);
      formData.append("updatedBy", auth.userId);
      const fetchData = await fetch(
        "http://localhost:3000/api/users/role-edit/" + userId,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const user = response.user;
      const profile = response.profile;
      const getHobbies = profile.arrHobbies;
      const arrHobbies = getHobbies ? getHobbies.split(",") : [];
      const dob = profile.dob;
      const createdAt = profile.createdAt;
      const updatedAt = profile.updatedAt;
      const objProfile = {
        arrHobbies: arrHobbies,
        dob: dob,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
      const updateProfile = {
        ...profile,
        ...objProfile,
      };
      user.profile = updateProfile;
      let addNotif = "";
      if (user.id + "" === auth.userId + "") {
        dispatch(authLogout());
        history.push("/");
        addNotif = ", Anda perlu login lagi!";
      } else {
        dispatch(userProfileUpdate(user));
      }
      toastr.success("Sukses", "Role user telah diupdate" + addNotif);
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user"
export const userDel = (id, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "userDelete" });
    try {
      const formData = new FormData();
      formData.append("userId", id);
      const fetchData = await fetch(
        "http://localhost:3000/api/users/delete/" + id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      const userId = response.userId;
      dispatch(userDelete(userId));
      toastr.success("Sukses", "User telah dihapus");
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/export"
export const usersExp = (data, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "usersExport" });
    try {
      let progress = randomNumber(1, 15);
      dispatch(progressPercent(progress));
      const usersData = JSON.stringify(data);
      const formData = new FormData();
      formData.append("users", usersData);
      progress = randomNumber(20, 40);
      dispatch(progressPercent(progress));
      const fetchData = await fetch("http://localhost:3000/api/users/export", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      progress = randomNumber(50, 70);
      dispatch(progressPercent(progress));
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired");
        throw error;
      }
      if (fetchData.status !== 201) {
        const error = new Error(response.message);
        throw error;
      }
      progress = randomNumber(71, 99);
      dispatch(progressPercent(progress));
      const dataSuccess = response.usersSuccess;
      const dataError = response.usersError;
      dispatch(usersExport([dataSuccess, dataError]));
      let addNotif = "";
      if (dataError.length > 0) {
        addNotif = ", tapi ditemukan duplikasi";
      }
      toastr.success("Sukses", "Export user selesai" + addNotif);
      progress = 100;
      dispatch(progressPercent(progress));
      dispatch(asyncActionFinish());
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log(error);
      } else {
        console.log(error);
        toastr.error("Error", `${error.message}`);
      }
      dispatch(asyncActionError());
    }
  };
};
// url: "/pengaturan-user/user/export"
export const resetExport = () => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "resetExport" });
    try {
      dispatch(usersExport([]));
      dispatch(progressPercent(0));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      toastr.error("Error", `${error.message}`);
    }
  };
};
