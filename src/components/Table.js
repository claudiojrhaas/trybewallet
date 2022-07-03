import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, subItem } from '../actions';

class Table extends React.Component {
  onClickExlcudesButton = ({ target }) => {
    const indexButton = target.id;
    const { dispatch, expenses } = this.props;
    dispatch(deleteItem(Number(indexButton)));
    const recoverArr = expenses.find((data) => (
      data.id === Number(indexButton)
    ));
    const { value, exchangeRates, currency } = recoverArr;
    const countSub = (value * exchangeRates[currency].ask).toFixed(2);

    dispatch(subItem(Number(countSub)));
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
              <td>{ Number(data.value).toFixed(2) }</td>
              <td>
                { data.currency === 'USD'
                  ? 'Dólar Comercial'
                  : (data.exchangeRates[data.currency].name.split('/')[0]) }

              </td>
              <td>{ Number(data.exchangeRates[data.currency].ask).toFixed(2) }</td>
              <td>
                {
                  Number(data.value * data.exchangeRates[data.currency].ask).toFixed(2)
                }

              </td>
              <td>Real</td>
              <td>
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
