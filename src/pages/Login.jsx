import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';

function Login({ history }) {
  const {
    setLoginData,
  } = useContext(recipesContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const minLength = 6;
    const re = /\S+@\S+\.\S+/;
    // refer = https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    if (password.length > minLength && re.test(email)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  const submitButton = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setLoginData({
      email,
      password,
    });
    const emailKey = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(emailKey));
    history.push('/foods');
  };

  const handleChange = ({ target }) => {
    const { value, type } = target;
    console.log(value);
    if (type === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className="login">
      <span className="profile">
        { '<div>' }
        <span className="title">Trybe Recipes</span>
        { '<div>' }
      </span>
      <input
        type="email"
        data-testid="email-input"
        placeholder="email"
        onChange={ handleChange }
        value={ email }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="password"
        onChange={ handleChange }
        value={ password }
      />
      <button
        type="button"
        className="login-btn"
        data-testid="login-submit-btn"
        onClick={ submitButton }
        disabled={ disable }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
