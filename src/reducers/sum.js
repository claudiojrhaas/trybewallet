import { SUM_TOTAL } from '../actions';

const INITIAL_STATE = {
  totalValueBRL: 0,
};

const total = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUM_TOTAL:
    return {
      ...state,
      totalValueBRL: state.totalValueBRL + action.payload.sumValues,
    };
  default: return state;
  }
};

export default total;