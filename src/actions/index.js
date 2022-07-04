import fetchAPI from '../services';

// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_RATES_SUCCESS = 'FETCH_RATES_SUCCESS';
export const SUM_TOTAL = 'SUM_TOTAL';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SUB_ITEM = 'SUB_ITEM';
export const EDIT_ITEM_TRUE = 'EDIT_ITEM_TRUE';
export const STOP_EDIT = 'STOP_EDIT';
export const SEND_NEW_DATA = 'SEND_NEW_DATA';
export const CHANGE_SUM_VALUE = 'CHANGE_SUM_VALUE';
export const CHANGE_SUBTRACT_VALUE = 'CHANGE_SUBTRACT_VALUE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const data = await fetchAPI();
  const filterData = Object.keys(data).filter((currency) => (
    currency !== 'USDT'));
  dispatch(fetchCurrenciesSuccess(filterData));
};

export const fetchRates = (payload) => ({
  type: FETCH_RATES_SUCCESS,
  payload,
});

export const addTotal = (sumValues) => ({
  type: SUM_TOTAL,
  payload: { sumValues },
});

export const deleteItem = (payload) => ({
  type: DELETE_ITEM,
  payload,
});

export const subItem = (subValues) => ({
  type: SUB_ITEM,
  payload: { subValues },
});

export const editItem = (payload) => ({
  type: EDIT_ITEM_TRUE,
  payload,
});

export const stopEdit = (payload) => ({
  type: STOP_EDIT,
  payload,
});

export const sendNewData = (payload) => ({
  type: SEND_NEW_DATA,
  payload,
});

export const changeSumValue = (payload) => ({
  type: CHANGE_SUM_VALUE,
  payload,
});

export const changeSubtractValue = (payload) => ({
  type: CHANGE_SUBTRACT_VALUE,
  payload,
});
