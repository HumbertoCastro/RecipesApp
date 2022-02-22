import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import recipesContext from '../context/recipesContext';

function IngredientsDrinks() {
  const [apiResult, setApiResult] = useState({
    drinks: [],
  });
  const {
    setApiSearch,
  } = useContext(recipesContext);
  const requestApi = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((x) => x.json()).then((y) => {
        y.drinks.length = 12;
        setApiResult(y);
        console.log(apiResult);
        console.log(y);
      });
  };
  useEffect(() => {
    requestApi();
  }, []);
  const history = useHistory();
  return (
    <div>
      {
        apiResult.drinks.map((x, index) => (
          <button
            type="button"
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-card` }
            onClick={ async () => {
              await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${x.strIngredient1}`)
                .then((xx) => xx.json()).then((resposta) => {
                  resposta.drinks.length = 12;
                  setApiSearch(resposta);
                });
              history.push('/drinks');
            } }
          >
            <img
              alt="ingredient img"
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${x.strIngredient1}-Small.png` }
            />
            <p data-testid={ `${index}-card-name` }>{ x.strIngredient1 }</p>
          </button>
        ))
      }
      <Footer />
    </div>
  );
}
export default IngredientsDrinks;
