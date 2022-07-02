import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, totalValueBRL } = this.props;

    return (
      <header>
        <span data-testid="email-field">{`Usuário: ${email}`}</span>
        <span data-testid="total-field">{ totalValueBRL.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValueBRL: state.sum.totalValueBRL,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValueBRL: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
