import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="emailUser">
          E-mail:
          <input
            data-testid="email-input"
            name="emailUser"
            type="email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            name="password"
            type="password"
          />
        </label>
        <button
          type="button"
          // disabled={}
          onClick={ console.log('cliquei') }
        >
          Enviar
        </button>
      </div>
    );
  }
}

export default Login;
