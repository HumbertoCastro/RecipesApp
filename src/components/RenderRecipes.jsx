import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FavButton from './FavButton';

function RenderRecipes() {
  const [renderList, setRenderList] = useState([]);
  const history = useHistory();
  let dones = [];
  if (history.location.pathname.includes('favorite')) {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      console.log('endto');
      dones = JSON.parse(localStorage.getItem('favoriteRecipes'));
      dones = dones.map((x) => {
        x.tags = [];
        return x;
      });
      console.log(dones);
    } else {
      console.log(localStorage.getItem('favoriteRecipes'));
    }
  } else {
    dones = JSON.parse(localStorage.getItem('doneRecipes'));
  }
  dones = dones.map((x) => {
    if (x.type === 'food') {
      x.category = `${x.nationality} - ${x.category}`;
    } else {
      x.category = x.alcoholicOrNot;
    }
    return x;
  });
  useEffect(() => {
    setRenderList(dones);
    console.log(renderList);
  }, []);
  return (
    <div className="render-page">
      <div className="buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setRenderList(dones);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setRenderList(dones.filter((x) => x.type === 'food'));
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setRenderList(dones.filter((x) => x.type === 'drink'));
          } }
        >
          Drinks
        </button>
      </div>
      {
        renderList.map((x, index) => (
          <div key={ `${index}-done` } className="cards-render">
            <button
              type="button"
              onClick={ () => {
                history.push(`${x.type}s/${x.id}`);
              } }
            >
              <img
                src={ x.image }
                alt="img"
                data-testid={ `${index}-horizontal-image` }
                width="150px"
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {
                x.category
              }
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => {
                history.push(`${x.type}s/${x.id}`);
              } }
            >
              {
                x.name
              }
            </button>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {
                x.doneDate
              }
            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              className="share-btn-done"
              src={ shareIcon }
              onClick={ () => {
                navigator.clipboard.writeText(`http://localhost:3000/${x.type}s/${x.id}`);
                const btn = document.querySelector('.share-btn-done');
                btn.innerHTML = 'Link copied!';
              } }
            >
              <img alt="share" src={ shareIcon } />
            </button>
            {
              x.tags.map((y, ind) => (
                <p key={ `${ind}-tags` } data-testid={ `${index}-${y}-horizontal-tag` }>
                  {
                    y
                  }
                </p>
              ))
            }
            <FavButton i={ index } id={ x.id } />
          </div>
        ))
      }
    </div>
  );
}
export default RenderRecipes;

RenderRecipes.prototype = {
  recipe: PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cat: PropTypes.string.isRequired,
  }).isRequired,
};
