import {
  RESET_FORGOT_PASSWORD_DATA,
  SET_FORGOT_PASSWORD_DATA,
} from '../../helpers/utils';

const initialState = {
  dataForgot: {
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  },
};

const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_DATA: {
      state.dataForgot = {...state.dataForgot, ...action.payload};
      return {...state};
    }
    case RESET_FORGOT_PASSWORD_DATA: {
      state = initialState;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default forgotPassword;
