const initialState = {
  isLoading: false,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING': {
      state.isLoading = !state.isLoading;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default loading;
