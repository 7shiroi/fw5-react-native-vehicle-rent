import {GET_HISTORY_DATA} from '../../helpers/utils';

const initialState = {
  historiesData: [],
  pageInfo: {},
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY_DATA: {
      state.historiesData = action.payload.result;
      state.pageInfo = action.payload.pageinfo;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default history;
