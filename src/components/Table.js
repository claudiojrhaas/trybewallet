import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        { console.log(expenses) }
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
        { expenses?.map((data, i) => (
          <tr key={ i }>
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
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(Table);
