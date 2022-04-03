import {SET_VEHICLES_DATA} from '../../helpers/utils';

const initialState = {
  vehiclesData: [],
};

const vehicles = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLES_DATA: {
      state.vehiclesData = action.payload;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default vehicles;
