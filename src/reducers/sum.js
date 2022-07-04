import { CHANGE_SUBTRACT_VALUE, CHANGE_SUM_VALUE, SUB_ITEM, SUM_TOTAL } from '../actions';

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
  case SUB_ITEM:
    return {
      ...state,
      totalValueBRL: Math.abs(state.totalValueBRL - action.payload.subValues),
    };
  case CHANGE_SUBTRACT_VALUE:
    return {
      ...state,
      totalValueBRL: Math.abs(state.totalValueBRL - action.payload),
    };
  case CHANGE_SUM_VALUE:
    return {
      ...state,
      totalValueBRL: Math.abs(state.totalValueBRL + action.payload),
    };
  default: return state;
  }
};

export default total;
