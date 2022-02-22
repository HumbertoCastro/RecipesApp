import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';
import whiteHeart from '../images/whiteHeartIcon.svg';

function Provider({ children }) {
  const [loginData, setLoginData] = useState([]);
  const [apiSearch, setApiSearch] = useState([]);
  const [response, setResponse] = useState([]);
  const [srcImg, setSrcImg] = useState(whiteHeart);

  const contextValue = {
    srcImg,
    setSrcImg,
    response,
    setResponse,
    loginData,
    setLoginData,
    apiSearch,
    setApiSearch,
  };

  return (
    <recipesContext.Provider value={ contextValue }>
      {children}
    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
