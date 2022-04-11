import http from '../../helpers/http';
import qs from 'qs';
import {
  SET_ERROR,
  SET_FORGOT_PASSWORD_DATA,
  SET_MESSAGE,
} from '../../helpers/utils';

export const setForgotPasswordData = data => {
  return async dispatch => {
    try {
      dispatch({type: SET_FORGOT_PASSWORD_DATA, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

export const forgotPasswordRequest = bodyData => {
  return async dispatch => {
    try {
      const {data} = await http().post(
        'auth/forgotPassword',
        qs.stringify(bodyData),
      );
      dispatch({type: SET_MESSAGE, payload: data.message});
    } catch (error) {
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};
