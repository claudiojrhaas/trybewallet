import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendExpensesInfos } from '../actions';

class AddExpenseForm extends React.Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao', // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleEnableButton);
  };

  handleClickAddExpense = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    this.setState((estadoAnterior) => ({
      id: estadoAnterior.id === id && estadoAnterior.id + 1,
    }));
    dispatch(sendExpensesInfos(this.state));
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
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
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
