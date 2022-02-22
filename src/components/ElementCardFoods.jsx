import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';

function ElementCardFoods() {
  const [catDrinks, setCatDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState('');
  const history = useHistory();

  const requestCat = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((x) => x.json()).then((y) => {
        console.log(y.meals);
        y.meals.length = 5;
        setLoading(false);
        setCatDrinks(y.meals);
      });
  };
  const {
    apiSearch,
    setApiSearch,
  } = useContext(recipesContext);
  if (Object.keys(apiSearch).length === 0) {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((x) => x.json()).then((y) => {
        y.meals.length = 12;
        console.log(y);
        setApiSearch(y);
      });
  }

  useEffect(() => {
    requestCat();
  }, []);
  const renderCards = () => apiSearch.meals.map((card, index) => (
    <button
      data-testid={ `${index}-recipe-card` }
      key={ index }
      type="button"
      className="cards"
      onClick={ () => {
        history.push(`/foods/${card.idMeal}`);
      } }
    >
      <h1 data-testid={ `${index}-card-name` }>{ card.strMeal }</h1>
      <img
        alt="food"
        src={ card.strMealThumb }
        width="100px"
        height="100px"
        data-testid={ `${index}-card-img` }
      />
    </button>
  ));

  const handleCLick = ({ target: { value } }) => {
    if (toggle === value) {
      setApiSearch([]);
      setToggle('');
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((q) => q.json()).then((p) => {
          console.log(p);
          p.meals.length = 12;
          setApiSearch(p);
          setToggle(value);
        });
    }
  };
  const renderCategorias = () => {
    if (history.location.pathname.includes('/nationalities')) {
      return (
        null
      );
    }
    return catDrinks.map((y, index) => (
      <div key={ `cat${index}` }>
        <button
          type="button"
          value={ y.strCategory }
          className="cat-card"
          data-testid={ `${y.strCategory}-category-filter` }
          onClick={ handleCLick }
        >
          {
            y.strCategory
          }
        </button>
      </div>
    ));
  };
  return (
    <div
      className="elements-cards"
    >
      <div className="category">
        { loading ? null : renderCategorias() }
        { !history.location.pathname.includes('nationalities') ? (
          <button
            data-testid="All-category-filter"
            onClick={ () => setApiSearch([]) }
            type="button"
          >
            All
          </button>) : null}
      </div>
      <div className="recipes-cards">
        {Object.keys(apiSearch).length > 0 ? renderCards() : null}
      </div>
    </div>
  );
}
export default ElementCardFoods;
