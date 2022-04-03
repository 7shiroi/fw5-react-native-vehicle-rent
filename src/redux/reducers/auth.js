import {AUTH_GET_PROFILE, AUTH_LOGIN, AUTH_LOGOUT} from '../../helpers/utils';

const initialState = {
  token: null,
  userData: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN: {
      state.token = action.payload.token;
      return {...state};
    }
    case AUTH_LOGOUT: {
      state = initialState;
      return {...state};
    }
    case AUTH_GET_PROFILE: {
      state.userData = action.payload;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default auth;
