import {CLEAR_FILTER, SET_FILTER} from '../../helpers/utils';

const initialState = {
  options: {
    search: null,
    minPrice: null,
    maxPrice: null,
    location: null,
    idCategory: null,
    hasPrepayment: null,
    isAvailable: null,
    page: 1,
    limit: 10,
  },
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      state.options = {...state.options, ...action.payload};
      return {...state};
    }
    case CLEAR_FILTER: {
      state.options = initialState;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default filter;
