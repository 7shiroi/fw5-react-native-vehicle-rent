import {GET_CATEGORIES} from '../../helpers/utils';

const initialState = {
  categoriesData: [],
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      state.categoriesData = action.payload;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default categories;
