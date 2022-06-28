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
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="textarea"
            name="description"
            value={ description }
          />
        </label>
        <label htmlFor="currencie">
          Moeda:
          <select
            type="select"
            name="currencie"
            value={ currencie }
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
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Dartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
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
  currencies: PropTypes.shape({
    currencies: PropTypes.string.isRequired,
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(AddExpenseForm);
