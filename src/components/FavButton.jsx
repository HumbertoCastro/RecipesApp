import React from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';

function FavButton({ i, id }) {
  console.log(id);
  return (
    <button
      type="button"
      data-testid={ `${i}-horizontal-favorite-btn` }
      id={ id }
      src={ blackHeart }
      onClick={ () => {
        const btn = document.getElementById(id);
        const parentbtn = btn.parentElement;
        let dones = JSON.parse(localStorage.getItem('favoriteRecipes'));
        dones = dones.filter((x) => x.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(dones));
        dones = JSON.parse(localStorage.getItem('favoriteRecipes'));
        parentbtn.parentElement.removeChild(parentbtn);
      } }
    >
      <img src={ blackHeart } alt="fav" />
    </button>
  );
}
export default FavButton;

FavButton.propTypes = {
  i: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
