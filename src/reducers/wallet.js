import {
  FETCH_RATES_SUCCESS,
  FETCH_CURRENCIES_SUCCESS,
  DELETE_ITEM,
  EDIT_ITEM_TRUE,
  STOP_EDIT,
  SEND_NEW_DATA,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case FETCH_RATES_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: state.expenses
        .filter((el) => parseFloat(el.id) !== action.payload),
    };
  case EDIT_ITEM_TRUE:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };
  case STOP_EDIT:
    return {
      ...state,
      editor: action.payload.editor,
    };
  case SEND_NEW_DATA: {
    const index = action.payload.id;
    state.expenses[index] = action.payload;
    return {
      ...state,
      expenses: [...state.expenses],
    };
  }
  default: return state;
  }
};

export default wallet;
