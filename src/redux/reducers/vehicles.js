import {
  CLEAR_DETAIL_VEHICLE,
  GET_DETAIL_VEHICLE,
  SET_VEHICLES_DATA,
} from '../../helpers/utils';

const initialState = {
  vehiclesData: [],
  detailData: {},
};

const vehicles = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLES_DATA: {
      state.vehiclesData = action.payload;
      return {...state};
    }
    case GET_DETAIL_VEHICLE: {
      state.detailData = action.payload;
      return {...state};
    }
    case CLEAR_DETAIL_VEHICLE: {
      state.detailData = {};
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default vehicles;
