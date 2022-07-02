import { ADD_TOTAL } from '../actions';

const INITIAL_STATE = {
  total: 0,
};

const total = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOTAL:
    return {
      ...state,
      total: state.total + action.payload.total,
    };
  default: return state;
  }
};

export default total;
