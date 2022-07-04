import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSubtractValue, deleteItem, editItem, subItem } from '../actions';

class Table extends React.Component {
  onClickExlcudesButton = ({ target }) => {
    const indexButton = target.innerHTML === 'Excluir' && target.id;
    const { dispatch, expenses } = this.props;
    dispatch(deleteItem(parseFloat(indexButton)));
    const recoverArr = expenses.find((data) => (
      data.id === parseFloat(indexButton)
    ));
    const { value, exchangeRates, currency } = recoverArr;
    const countSub = (value * exchangeRates[currency].ask).toFixed(2);
    dispatch(subItem(parseFloat(countSub)));
  };

  onClickEditButton = ({ target }) => {
    const indexButton = target.innerHTML === 'Editar' && target.id;
    const payload = { editor: true, idToEdit: parseFloat(indexButton) };
    const { dispatch, expenses } = this.props;
    dispatch(editItem(payload));
    const arr = expenses.find((data) => (
      data.id === parseFloat(indexButton)
    ));
    const { value, exchangeRates, currency } = arr;
    const subtractValue = (value * exchangeRates[currency].ask).toFixed(2);
    dispatch(changeSubtractValue(parseFloat(subtractValue)));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses?.map((data) => (
            <tr key={ data.id }>
              <td>{ data.description }</td>
              <td>{ data.tag }</td>
              <td>{ data.method }</td>
              <td>{ parseFloat(data.value).toFixed(2) }</td>
              <td>
                {
                  data.currency === 'USD'
                    ? 'Dólar Comercial'
                    : (data.exchangeRates[data.currency].name.split('/')[0])
                }

              </td>
              <td>
                { parseFloat(data.exchangeRates[data.currency].ask).toFixed(2) }
              </td>
              <td>
                {
                  parseFloat(data.value
                    * data.exchangeRates[data.currency].ask).toFixed(2)
                }

              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  id={ data.id }
                  onClick={ this.onClickEditButton }
                >
                  Editar

                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  id={ data.id }
                  onClick={ this.onClickExlcudesButton }
                >
                  Excluir

                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
