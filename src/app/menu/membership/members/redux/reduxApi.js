import { membersGet, memberCreate, memberUpdate } from "./reduxAction";
import { detailsItem } from "../../../pages/details/redux/detailsAction";
import { toastr } from "react-redux-toastr";
import {
  asyncActionFinish,
  asyncActionError,
} from "../../../../async/asyncActions";
import { ASYNC_ACTION_START } from "../../../../async/asyncConstant";
import { openModal } from "../../../modals/redux/modalActions";

// url: /keanggotaan/anggota
export const membersIndex = (token, itn, cp, st) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "membersIndex" });
    try {
      const formData = new FormData();
      const number = itn ? itn : 10;
      formData.append("number", number);
      formData.append("page", cp);
      formData.append("search", st);
      const fetchData = await fetch("http://localhost:3000/api/members", {
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
      dispatch(detailsItem({ id: "anggota", total: response.totals }));
      dispatch(membersGet(response.members));
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
// url: "/keanggotaan/anggota/tambah"
export const memberAdd = (member, auth, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "memberAdd" });
    const formData = new FormData();
    const arr = Object.entries(member);
    for (const [key, value] of arr) {
      if (key !== "joinDate" && key !== "dob") {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    if (member.joinDate) {
      const joinDate = member.joinDate.toISOString();
      formData.append("joinDate", joinDate);
    }
    if (member.dob) {
      const dob = member.dob.toISOString();
      formData.append("dob", dob);
    }
    try {
      let fetchData = await fetch("http://localhost:3000/api/members/create", {
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
      const member = response.member;
      dispatch(memberCreate(member));
      dispatch(asyncActionFinish());
      history.push(`/keanggotaan/anggota/detail/${response.member.id}`);
      toastr.success("Sukses", "Anggota telah dibuat");
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
// url: "/keanggotaan/anggota/detail/:memberId"
export const memberView = (memberId, auth) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "memberView" });
    try {
      const fetchData = await fetch(
        "http://localhost:3000/api/members/" + memberId,
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
      const member = response.member;
      dispatch(memberUpdate(member));
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
// url: "/keanggotaan/anggota/edit/:memberId"
export const memberEdit = (values, auth, memberId, history) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "memberEdit" });
    const formData = new FormData();
    const arr = Object.entries(values);
    for (const [key, value] of arr) {
      if (key !== "joinDate" && key !== "dob" && key !== "updatedBy") {
        if (value !== null && value) {
          formData.append(key, value);
        }
      }
    }
    if (values.joinDate) {
      const joinDate = typeof values.joinDate !== "string" ? values.joinDate.toISOString() : values.joinDate;
      formData.append("joinDate", joinDate);
    }
    if (values.dob) {
      const dob = typeof values.dob !== "string" ? values.dob.toISOString() : values.dob;
      formData.append("dob", dob);
    }
    formData.append("updatedBy", auth.userId);
    try {
      const fetchData = await fetch(
        "http://localhost:3000/api/members/edit/" + memberId,
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
      const member = response.member;
      dispatch(memberUpdate(member));
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

export const memberPhotoUpload = (file, filename, auth, memberId) => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "memberPhotoUpload" });
    const token = auth.token;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("filename", filename);
    try {
      let fetchData = await fetch(
        "http://localhost:3000/api/members/photo-upload/" + memberId,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const response = await fetchData.json();
      if (response.message === "jwt expired") {
        dispatch(openModal("SessionEndModal"));
        const error = new Error("jwt expired")
        throw (error);
      }
      if (fetchData.status !== 200) {
        const error = new Error(response.message);
        throw error;
      }
      let member = response.member;
      dispatch(memberUpdate(member));
      toastr.success("Sukses", "Profil foto tersimpan");
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
  }
}

export const memberMainPhotoSet = () => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "memberMainPhotoSet" });
    try {

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
  }
}

export const memberPhotoDelete = () => {
  return async (dispatch) => {
    dispatch({ type: ASYNC_ACTION_START, payload: "memberPhotoDelete" });
    try {
      
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
  }
}
