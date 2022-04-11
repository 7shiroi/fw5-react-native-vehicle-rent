import http from '../../helpers/http';
import {
  SET_VEHICLES_DATA,
  SET_ERROR,
  GET_DETAIL_VEHICLE,
  SET_REGISTERED_LOCATIONS,
  SET_MESSAGE,
} from '../../helpers/utils';
import qs from 'qs';
import {rnFetchDataToObject} from '../../helpers/converter';

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
      console.log(queryString);
      console.log(`/vehicle?${qs.stringify(queryString)}`);
      const {data} = await http().get(`/vehicle?${qs.stringify(queryString)}`);
      dispatch({
        type: SET_VEHICLES_DATA,
        payload: {result: data.result, pageInfo: data.pageinfo},
      });
    } catch (error) {
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};

export const getNextVehiclesAction = url => {
  return async dispatch => {
    try {
      const {data} = await http().get(url);
      dispatch({
        type: 'GET_NEXT_DATA',
        payload: {result: data.result, pageInfo: data.pageinfo},
      });
    } catch (error) {
      dispatch({type: SET_ERROR, payload: error.response.data.message});
    }
  };
};

export const getPopularVehiclesAction = async dispatch => {
  try {
    const {data} = await http().get('/vehicle/popular?limit=6');
    dispatch({
      type: SET_VEHICLES_DATA,
      payload: {result: data.result, pageInfo: data.pageinfo},
    });
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

export const getRegisteredLocationsAction = async dispatch => {
  try {
    const {data} = await http().get('/vehicle/locations');
    const locations = data.result.map(obj => obj.location);
    dispatch({type: SET_REGISTERED_LOCATIONS, payload: locations});
  } catch (error) {
    dispatch({type: SET_ERROR, payload: error.response.data.message});
  }
};

export const addVehicleAction = (token, inputData) => {
  return async dispatch => {
    try {
      const {data} = await http(token, true, 'POST', 'vehicle', inputData);
      const response = rnFetchDataToObject(data);
      if (response.success === 'false') {
        throw response.message
          ? response.message.replaceAll('"', '')
          : response.error.replaceAll('"', '');
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: response.message.replaceAll('"', ''),
        });
      }
    } catch (e) {
      if (typeof e === 'string') {
        dispatch({type: SET_ERROR, payload: e});
      }
    }
  };
};
