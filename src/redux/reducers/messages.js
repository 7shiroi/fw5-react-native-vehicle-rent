import {RESET_MESSAGE_STATE, SET_ERROR, SET_MESSAGE} from '../../helpers/utils';

const initialState = {
  msg: '',
  error: false,
  errorMsg: '',
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE: {
      state.msg = action.payload;
      return {...state};
    }
    case SET_ERROR: {
      state.error = true;
      state.errorMsg = action.payload;
      return {...state};
    }
    case RESET_MESSAGE_STATE: {
      return {...initialState};
    }
    default: {
      return {...state};
    }
  }
};

export default messages;
