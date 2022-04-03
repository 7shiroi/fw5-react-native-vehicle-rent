import http from '../../helpers/http';
import {GET_CATEGORIES, SET_ERROR} from '../../helpers/utils';

export const getCategoriesAction = async dispatch => {
  try {
    const {data} = await http().get('/category');
    dispatch({type: GET_CATEGORIES, payload: data.result});
  } catch (error) {
    dispatch({type: SET_ERROR, payload: error.response.data.message});
  }
};
