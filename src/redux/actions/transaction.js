import http from '../../helpers/http';
import qs from 'qs';
import {
  SET_ERROR,
  SET_MESSAGE,
  SET_TRANSACTION_DATA,
} from '../../helpers/utils';

export const setTransactionData = data => {
  return dispatch => {
    dispatch({type: SET_TRANSACTION_DATA, payload: data});
  };
};

export const saveTransaction = (token, inputData) => {
  return async dispatch => {
    try {
      const {data} = await http(token).post('history', qs.stringify(inputData));
      dispatch({type: SET_MESSAGE, payload: data.message});
    } catch (e) {
      dispatch({type: SET_ERROR, payload: e.response.data.error[0]});
    }
  };
};
