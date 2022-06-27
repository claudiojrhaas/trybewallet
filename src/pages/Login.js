import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(addEmail(email));
  };

  render() {
    const { email, password } = this.state;

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
          // disabled={}
          onClick={ this.handleClick }
        >
          Enviar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
