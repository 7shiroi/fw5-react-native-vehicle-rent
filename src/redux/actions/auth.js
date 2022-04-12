import {
  AUTH_GET_PROFILE,
  AUTH_LOGIN,
  RESET_MESSAGE_STATE,
  SET_ERROR,
  SET_MESSAGE,
} from '../../helpers/utils';
import http from '../../helpers/http';
import qs from 'qs';

export const loginAction = (username, password) => {
  return async dispatch => {
    try {
      dispatch({type: RESET_MESSAGE_STATE});
      const inputData = {username, password};
      const {data} = await http().post('/auth/login', qs.stringify(inputData));
      dispatch({
        type: AUTH_LOGIN,
        payload: {
          token: data.result,
        },
      });
      const {data: profile} = await http(data.result).get('/profile');
      dispatch({type: AUTH_GET_PROFILE, payload: profile.result});
      dispatch({type: SET_MESSAGE, payload: data.message});
    } catch (e) {
      console.log(e.response);
      dispatch({type: SET_ERROR, payload: e.response.data.message});
    }
  };
};

export const registerAction = dataRegister => {
  return async dispatch => {
    try {
      dispatch({type: RESET_MESSAGE_STATE});
      const {data} = await http().post(
        '/auth/register',
        qs.stringify(dataRegister),
      );
      dispatch({type: SET_MESSAGE, payload: data.message});
    } catch (e) {
      dispatch({type: SET_ERROR, payload: e.response.data.error[0]});
    }
  };
};

export const getProfileAction = token => {
  return async dispatch => {
    try {
      const {data} = await http(token).get('/profile');
      dispatch({type: AUTH_GET_PROFILE, payload: data.result});
    } catch (e) {
      dispatch({type: SET_ERROR, payload: e.response.data.error[0]});
    }
  };
};

export const updateProfileAction = (token, updateData) => {
  return async dispatch => {
    try {
      const {data: updatedData} = await http(
        token,
        true,
        'PATCH',
        'profile',
        updateData,
      );

      const responseData = updatedData.includes('message')
        ? qs.parse(
            updatedData
              .replace('{', '')
              .replace('}', '')
              .replaceAll(':', '=')
              .replaceAll(',', '&')
              .replace('"success"', 'success')
              .replace('"message"', 'message'),
          )
        : qs.parse(
            updatedData
              .replace('{', '')
              .replace('}', '')
              .replaceAll(':', '=')
              .replaceAll(',', '&')
              .replace('"success"', 'success')
              .replace('"error"', 'error'),
          );

      if (responseData.success === 'false') {
        throw responseData.message
          ? responseData.message.replaceAll('"', '')
          : responseData.error.replaceAll('"', '');
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: responseData.message.replaceAll('"', ''),
        });
      }
      const {data} = await http(token).get('/profile');
      dispatch({type: AUTH_GET_PROFILE, payload: data.result});
    } catch (e) {
      if (typeof e === 'string') {
        dispatch({type: SET_ERROR, payload: e});
      }
    }
  };
};

export const verifyUserRequest = (token, bodyData) => {
  return async dispatch => {
    try {
      const {data} = await http(token).post(
        'auth/verifyUser',
        qs.stringify(bodyData),
      );
      dispatch({type: SET_MESSAGE, payload: data.message});
    } catch (error) {
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};
