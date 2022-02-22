import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();
  let title = history.location.pathname.substring(1);
  title = title.charAt(0).toUpperCase() + title.slice(1);
  const [render, setRender] = useState(false);
  const redirectProfile = () => {
    history.push('/profile');
  };
  const redirectSearch = () => {
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };

  return (
    <div className="header">
      <header>
        <button
          src={ ProfileIcon }
          type="button"
          data-testid="profile-top-btn"
          onClick={ redirectProfile }
        >
          <img src={ ProfileIcon } alt="profileicon" />
        </button>
        <span>
          { '<div>' }
          <span className="title">{ title }</span>
          { '<div>' }
        </span>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ redirectSearch }
          src={ SearchIcon }
        >
          <img src={ SearchIcon } alt="search icon" />
        </button>
      </header>
      <div>
        {
          render ? <SearchBar /> : null
        }
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
