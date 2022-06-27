import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class Login extends React.Component {
  state = {
    user: '',
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
    const { user, password } = this.state;

    return (
      <div>
        <label htmlFor="user">
          E-mail:
          <input
            data-testid="email-input"
            name="user"
            type="email"
            value={ user }
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

export default connect()(Login);
