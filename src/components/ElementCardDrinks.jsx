import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';

function ElementCardDrinks() {
  const [catDrinks, setCatDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState('');
  const history = useHistory();

  const requestCat = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((x) => x.json()).then((y) => {
        console.log(y.drinks);
        y.drinks.length = 5;
        setLoading(false);
        setCatDrinks(y.drinks);
      });
  };
  const {
    apiSearch,
    setApiSearch,
  } = useContext(recipesContext);
  if (Object.keys(apiSearch).length === 0) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((x) => x.json()).then((y) => {
        y.drinks.length = 12;
        console.log(y);
        setApiSearch(y);
      });
  } else {
    if (apiSearch.drinks.length > 1) {
      apiSearch.drinks.length = 12;
    }
    console.log('');
  }

  useEffect(() => {
    requestCat();
  }, []);
  const renderCards = () => apiSearch.drinks.map((card, index) => (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      key={ index }
      className="cards"
      onClick={ () => { history.push(`/drinks/${card.idDrink}`); } }
    >
      <h1 data-testid={ `${index}-card-name` }>{ card.strDrink }</h1>
      <img
        alt="food"
        src={ card.strDrinkThumb }
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
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((result) => result.json()).then((p) => {
          console.log(p);
          p.drinks.length = 12;
          setToggle(value);
          setApiSearch(p);
        });
    }
  };
  const renderCategorias = () => (
    catDrinks.map((y, index) => (
      <button
        type="button"
        key={ `cat${index}` }
        value={ y.strCategory }
        className="cat-card"
        data-testid={ `${y.strCategory}-category-filter` }
        onClick={ handleCLick }
      >
        {
          y.strCategory
        }
      </button>))
  );
  return (
    <div
      className="elements-cards"
    >
      <div className="category">
        { loading ? null : renderCategorias() }
        <button
          data-testid="All-category-filter"
          onClick={ () => setApiSearch([]) }
          type="button"
        >
          All
        </button>
      </div>
      <div className="recipes-cards">
        {Object.keys(apiSearch).length > 0 ? renderCards() : null}
      </div>
    </div>
  );
}
export default ElementCardDrinks;
