import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import saveRecipe from '../helpers/saveRecipe';
import Ingredients from './Ingredients';
import Recomended from './Recomended';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function RenderDetailsFood({ res }) {
  const history = useHistory();
  const [srcImg, setSrcImg] = useState(whiteHeart);
  function verifyFav() {
    const href = document.location.href.split('/');
    let id = 0;
    if (history.location.pathname.includes('/in-progress')) {
      id = href[href.length - 2];
    } else {
      id = href[href.length - 1];
    }
    console.log(id);
    let favs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favs !== null) {
      favs = Object.values(favs);
      if (favs.some((x) => x.id === id)) {
        setSrcImg(blackHeart);
      }
    }
  }
  useEffect(() => {
    verifyFav();
  }, []);
  const {
    strArea,
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strSource,
  } = res;
  return (
    <div className="details-page">
      <img
        src={ strMealThumb }
        alt="meal-thumb"
        width="100px"
        height="100px"
        data-testid="recipe-photo"
        className="img-details"
      />
      <div className="title-div">
        <span>{ '<h1>' }</span>
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <span>{ '<h1>' }</span>
      </div>
      <div>
        <button
          type="button"
          data-testid="share-btn"
          className="share-btn"
          onClick={ () => {
            let nav = history.location.pathname;
            if (nav.includes('in-progress')) {
              nav = nav.split('/in-progress');
              nav.pop();
              navigator.clipboard.writeText(`http://localhost:3000${nav[0]}`);
            } else {
              navigator.clipboard.writeText(`http://localhost:3000${nav}`);
            }
            const btn = document.querySelector('.share-btn');
            btn.innerHTML = 'Link copied!';
          } }
        >
          share
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          src={ srcImg }
          onClick={ () => {
            const favObject = {
              id: idMeal,
              type: 'food',
              nationality: strArea,
              category: strCategory,
              alcoholicOrNot: '',
              name: strMeal,
              image: strMealThumb,
            };
            saveRecipe(favObject);
            if (srcImg === blackHeart) {
              setSrcImg(whiteHeart);
            } else {
              setSrcImg(blackHeart);
            }
          } }
        >
          <img src={ srcImg } alt="fav" />
        </button>
      </div>
      <ul>
        <Ingredients element={ res } />
      </ul>
      <div className="p-div">
        <span>{ '<p>' }</span>
        <p data-testid="instructions">{ strInstructions }</p>
        <span>{ '</p>' }</span>
      </div>
      <video width="320" height="240" data-testid="video" controls>
        <track kind="captions" />
        <source src={ strSource } type="video/mp4" />
      </video>
      <Recomended />
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="start-button"
        onClick={ () => {
          history.push(`/foods/${idMeal}/in-progress`);
        } }
      >
        iniciar
      </button>
    </div>
  );
}

export default RenderDetailsFood;

RenderDetailsFood.propTypes = {
  res: PropTypes.shape({
    strArea: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strSource: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
  }).isRequired,
};
