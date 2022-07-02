import fetchAPI from '../services';

// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_RATES_SUCCESS = 'FETCH_RATES_SUCCESS';
export const SUM_TOTAL = 'SUM_TOTAL';

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
