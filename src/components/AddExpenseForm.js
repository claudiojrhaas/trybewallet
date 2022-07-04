import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTotal, changeSumValue, fetchRates, sendNewData, stopEdit } from '../actions';
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
    ...INITIAL_STATE,
    id: 0,
    isRenderEditButton: false,
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
    const sumValues = parseFloat(value) * data[currency].ask;
    dispatch(fetchRates(objState));
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    dispatch(addTotal(sumValues));
    this.clearInput();
  };

  handleEditInput = () => {
    const { idToEdit, expenses } = this.props;
    const objArr = expenses.find((data) => (
      data.id === parseFloat(idToEdit)
    ));
    this.setState({
      value: objArr.value,
      currency: objArr.currency,
      description: objArr.description,
      method: objArr.method,
      tag: objArr.tag,
      isRenderEditButton: true,
      exchangeRates: objArr.exchangeRates,
    });

    const payload = { editor: false };
    const { dispatch } = this.props;
    dispatch(stopEdit(payload));
  };

  handleEditExpense = () => {
    const { value, currency, description, method, tag, exchangeRates } = this.state;
    const { dispatch, idToEdit, expenses } = this.props;
    const payload = {
      id: idToEdit, value, currency, description, method, tag, exchangeRates,
    };
    // console.log(payload);
    dispatch(sendNewData(payload));
    this.setState({ isRenderEditButton: false });
    this.clearInput();
    const arr = expenses.find((data) => (
      data.id === parseFloat(idToEdit)
    ));
    const sumValue = (arr.value * arr.exchangeRates[arr.currency].ask).toFixed(2);
    dispatch(changeSumValue(parseFloat(sumValue)));
  };

  render() {
    const { value, description, currency, method, tag, isRenderEditButton } = this.state;
    const { currencies, editor } = this.props;
    if (editor) {
      this.handleEditInput();
    }

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
              currencies?.map((currEl, index) => (
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
        {
          isRenderEditButton
            ? (
              <button
                type="button"
                onClick={ this.handleEditExpense }
              >
                Editar despesa
              </button>)
            : (
              <button
                type="button"
                onClick={ this.handleClickAddExpense }
              >
                Adicionar Despesa
              </button>)
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

AddExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(AddExpenseForm);
