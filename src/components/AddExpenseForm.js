import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTotal, fetchRates } from '../actions';
import fetchAPI from '../services';
// import fetchAPI from '../services';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Alimentação',
};

class AddExpenseForm extends React.Component {
  state = {
    id: 0,
    ...INITIAL_STATE,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clearInput = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  handleClickAddExpense = async () => {
    const { dispatch } = this.props;
    const { value, currency, id, description, method, tag } = this.state;
    const data = await fetchAPI();
    const objState = {
      id, value, description, currency, method, tag, exchangeRates: data };
    const tot = Number(value) * data[currency].ask;
    dispatch(fetchRates(objState));
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    dispatch(addTotal(tot));
    this.clearInput();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value">
          Despesa:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="textarea"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            type="select"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currEl, index) => (
                <option key={ index } value={ currEl }>{ currEl }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClickAddExpense }
        >
          Adicionar Despesa

        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

AddExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AddExpenseForm);
