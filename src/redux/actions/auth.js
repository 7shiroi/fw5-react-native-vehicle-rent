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
      dispatch({type: SET_MESSAGE, payload: data.message});
    } catch (e) {
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
      const params = new FormData();

      for (const key in updateData) {
        params.append(key, updateData[key]);
      }
      console.log(params);
      const {data} = await http(token, true).patch('/profile', params);
      dispatch({type: AUTH_GET_PROFILE, payload: data.result});
    } catch (e) {
      dispatch({type: SET_ERROR, payload: e.response.data.error[0]});
    }
  };
};
