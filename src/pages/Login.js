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
    this.setState({ [name]: value }, this.validateSendButton);
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  validateSendButton = () => {
    const { email, password } = this.state;
    const EXPECTED_PASSWORD_LENGTH = 6;
    const EXPECTED_EMAIL_SHAPE = /^(\w|\.)+@[a-z]+\.com$/;
    if (password.length >= EXPECTED_PASSWORD_LENGTH
      && email.match(EXPECTED_EMAIL_SHAPE)) {
      this.setState({ isDisabledSendButton: false });
    } else {
      this.setState({ isDisabledSendButton: true });
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
