import {AUTH_LOGIN, AUTH_LOGOUT} from '../../helpers/utils';

const initialState = {
  token: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN: {
      state.token = action.payload.token;
      return {...state};
    }
    case AUTH_LOGOUT: {
      state.token = null;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default auth;
