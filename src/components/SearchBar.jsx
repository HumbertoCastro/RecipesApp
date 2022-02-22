import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';

function SearchBar() {
  const [valueRadio, setValueRadio] = useState('');
  const [inputText, setInputText] = useState('');
  const history = useHistory();
  const {
    setApiSearch,
    apiSearch,
  } = useContext(recipesContext);

  useEffect(() => {
    console.log(apiSearch);
    if ((apiSearch.meals !== undefined && apiSearch.meals.length === 1)
    || (apiSearch.drinks !== undefined && apiSearch.drinks.length === 1)) {
      if (history.location.pathname === '/foods') {
        history.push(`/foods/${apiSearch.meals[0].idMeal}`);
      } else {
        console.log('entrou');
        history.push(`/drinks/${apiSearch.drinks[0].idDrink}`);
      }
    }
  }, [apiSearch]);

  const requestApi = () => {
    switch (valueRadio) {
    case 'ingredient':
      if (history.location.pathname === '/foods') {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`)
          .then((x) => x.json()).then((y) => setApiSearch(y))
          .catch(() => { setApiSearch([]); global.alert('error'); });
      } else {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`)
          .then((x) => x.json()).then((y) => {
            setApiSearch(y);
          })
          .catch(() => { setApiSearch([]); global.alert('error'); });
      }
      break;
    case 'name':
      if (history.location.pathname === '/foods') {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
          .then((x) => x.json()).then((y) => setApiSearch(y))
          .catch(() => { setApiSearch([]); global.alert('error'); });
      } else {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`)
          .then((x) => x.json()).then((y) => {
            setApiSearch(y);
          })
          .catch(() => { setApiSearch([]); global.alert('error'); });
      }
      break;
    case 'first':
      if (inputText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        if (history.location.pathname === '/foods') {
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`)
            .then((x) => x.json()).then((y) => setApiSearch(y))
            .catch(() => { setApiSearch([]); global.alert('error'); });
        } else {
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`)
            .then((x) => x.json()).then((y) => {
              y.drinks.length = 12;
              console.log(y);
              setApiSearch(y);
            })
            .catch(() => { setApiSearch([]); global.alert('error'); });
        }
        console.log('lint');
      }
      break;
    default:
      console.log('default');
    }
  };
  const handleClick = ({ target: { value } }) => {
    const radios = document.querySelectorAll('.radiosSearch');
    for (let i = 0; i < radios.length; i += 1) {
      if (radios[i].value !== value) {
        radios[i].checked = false;
      }
    }
    setValueRadio(value);
  };
  const handleInput = ({ target: { value } }) => {
    setInputText(value);
  };
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="search itens"
        value={ inputText }
        onChange={ handleInput }
      />
      <p>Select a type of search</p>
      <div className="radios">
        <label htmlFor="ing">
          <input
            className="radiosSearch"
            type="radio"
            data-testid="ingredient-search-radio"
            id="ing"
            value="ingredient"
            onClick={ handleClick }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            className="radiosSearch"
            type="radio"
            data-testid="name-search-radio"
            id="name"
            value="name"
            onClick={ handleClick }
          />
          name
        </label>
        <label htmlFor="first">
          <input
            className="radiosSearch"
            type="radio"
            data-testid="first-letter-search-radio"
            id="first"
            value="first"
            onClick={ handleClick }
          />
          First Letter
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ requestApi }
        >
          Search
        </button>
      </div>

    </div>
  );
}

export default SearchBar;
