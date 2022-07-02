import React from 'react';

// Descrição;
// Tag;
// Método de pagamento;
// Valor;
// Moeda;
// Câmbio utilizado;
// Valor convertido;
// Moeda de conversão;
// Editar/Excluir.

class Table extends React.Component {
  render() {
    return (
      <table>
        Tabela
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
      </table>
    );
  }
}

export default Table;
