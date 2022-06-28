// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const filterData = Object.keys(data).filter((currencie) => (
    currencie !== 'USDT'));
  dispatch(fetchCurrenciesSuccess(filterData));
};
