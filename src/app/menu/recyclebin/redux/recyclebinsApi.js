import {
  recyclebinsGet, 
  // recyclebinRestore,
} from "./recyclebinsAction";
import { toastr } from "react-redux-toastr";
import {
  asyncActionFinish,
  asyncActionError,
} from "../../../async/asyncActions";
import { ASYNC_ACTION_START } from "../../../async/asyncConstant";
import { openModal } from "../../modals/redux/modalActions";

export const recyclebinsFetch = (token) => {
    return async (dispatch) => {
        dispatch({ type: ASYNC_ACTION_START, payload: "recyclebinFetch" });
        try {
            const fetchData = await fetch("http://localhost:3000/api/recyclebins", {
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
              const errorText = response.message;
              throw new Error(errorText);
            }
            dispatch(recyclebinsGet(response.recyclebins));
            dispatch(asyncActionFinish());
        } catch (error) {
            if (error.message === "unauthorized") {
              console.log(error);
            } else {
              console.log(error);
              toastr.error("Error", `${error.message}`);
            }
            dispatch(asyncActionError());
        }
    }
}