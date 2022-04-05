import http from '../../helpers/http';
import {
  SET_VEHICLES_DATA,
  SET_ERROR,
  GET_DETAIL_VEHICLE,
} from '../../helpers/utils';

// export const getVehiclesAction = async dispatch => {
//   try {
//     const {data} = await http().get('/vehicle');
//     dispatch({type: SET_VEHICLES_DATA, payload: data.result});
//   } catch (error) {
//     dispatch({type: SET_ERROR, payload: error.response.data.message});
//   }
// };

export const getVehiclesAction = queryString => {
  return async dispatch => {
    try {
      const {data} = await http().get(`/vehicle?${queryString}`);
      dispatch({type: SET_VEHICLES_DATA, payload: data.result});
    } catch (error) {
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};

export const getPopularVehiclesAction = async dispatch => {
  try {
    const {data} = await http().get('/vehicle/popular?limit=6');
    dispatch({type: SET_VEHICLES_DATA, payload: data.result});
  } catch (error) {
    dispatch({type: SET_ERROR, payload: error.response.data.message});
  }
};

export const getDetailVehicle = id => {
  return async dispatch => {
    try {
      const {data} = await http().get(`/vehicle/${id}`);
      dispatch({type: GET_DETAIL_VEHICLE, payload: data.result});
    } catch (error) {
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};
