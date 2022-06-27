import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabledSendButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleEnableButton);
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  handleEnableButton = () => {
    const { password } = this.state;
    const EXPECTED_PASSWORD_LENGTH = 6;
    if (password.length >= EXPECTED_PASSWORD_LENGTH) {
      this.setState({ isDisabledSendButton: false });
    }
  };

  render() {
    const { email, password, isDisabledSendButton } = this.state;

    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input
            data-testid="email-input"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabledSendButton }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
