import {openModal} from '../../menu/modals/redux/modalActions';
import { toastr } from 'react-redux-toastr';

export const checkRes = (res, fetchd, dispatch, status) => {
    if (res.message === 'jwt expired') {
      dispatch(openModal('SessionEndModal'));
      const error = new Error('jwt expired');
      return error;
    }
    if (status === 200 && fetchd.status !== 200) {
      const error = new Error(res.message);
      return error;
    }
    if (status === 201 && fetchd.status !== 201) {
      const error = new Error(res.message);
      return error;
    }
  }

  export const checkErr = (error) => {
    if (error.message === 'jwt expired') {
      console.log(error);
    } else {
      console.log(error);
      toastr.error('Error', `${error.message}`);
    }
  }
  