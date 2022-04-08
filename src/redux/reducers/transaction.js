import {
  CLEAR_TRANSACTION_DATA,
  SET_TRANSACTION_DATA,
} from '../../helpers/utils';

const initialState = {
  quantity: 1,
  rentDuration: 1,
  startDate: null,
  prepayment: 0,
  step: 1,
  paymentType: '',
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTION_DATA: {
      state = {...state, ...action.payload};
      return {...state};
    }
    case CLEAR_TRANSACTION_DATA: {
      state = initialState;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default transaction;
