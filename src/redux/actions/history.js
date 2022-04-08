import http from '../../helpers/http';
import {GET_HISTORY_DATA, SET_ERROR, SET_MESSAGE} from '../../helpers/utils';

export const getHistoryAction = token => {
  return async dispatch => {
    try {
      const {data} = await http(token).get('/history');
      dispatch({
        type: GET_HISTORY_DATA,
        payload: {result: data.result, pageInfo: data.pageinfo},
      });
    } catch (error) {
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};

export const deleteHistoryAction = (token, id) => {
  return async dispatch => {
    try {
      const {data} = await http(token).delete(`/history/${id}`);
      dispatch({type: SET_MESSAGE, payload: data.message});
    } catch (error) {
      console.log(error.response);
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};
