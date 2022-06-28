import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AddExpenseForm extends React.Component {
  state = {
    expense: '',
    description: '',
    currencie: '',
    method: '',
    tag: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleEnableButton);
  };

  render() {
    const { expense, description, currencie, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="expense">
          Despesa:
          <input
            data-testid="value-input"
            type="name"
            name="expense"
            value={ expense }
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
        <label htmlFor="currencie">
          Moeda:
          <select
            type="select"
            name="currencie"
            id="currencie"
            value={ currencie }
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
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

AddExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(AddExpenseForm);
