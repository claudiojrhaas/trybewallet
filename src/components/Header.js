import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  // state = {
  //   totalValueBRL: 0,
  //   idMirror: -1,
  // }

  // convertCurrency = () => {
  //   const { exchangeRates, value } = this.props;
  //   console.log(exchangeRates);
  //   console.log(value);
  //   // if (exchangeRates) {
  //   const findObject = Object.entries(exchangeRates)
  //     .find((el) => el.some((i) => i === currency));
  //   const askValue = Number(findObject[1].ask);
  //   this.setState((prevState) => ({
  //     totalValueBRL: prevState.totalValueBRL + (Number(value) / askValue),
  //     idMirror: prevState.idMirror + 1,
  //   }));
  // }
  // };

  render() {
    // const { totalValueBRL } = this.state;
    const { email, total } = this.props;

    return (
      <header>
        <span data-testid="email-field">{`Usuário: ${email}`}</span>
        <span data-testid="total-field">{ total.toFixed(2) }</span>
        {/* { id > idMirror && this.convertCurrency() } */}
        <span data-testid="header-currency-field">BRL</span>
        {/* <button type="button" onClick={ this.convertCurrency }>Somar</button> */}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.total.total,
  // exchangeRates: state.wallet.expenses.
  // currency: state.wallet.expenses.currency,
  // value: state.wallet.expenses.value,
  // id: state.wallet.expenses.id,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  // exchangeRates: PropTypes.objectOf(Object).isRequired,
  // currency: PropTypes.string.isRequired,
  // value: PropTypes.number.isRequired,
  // id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
