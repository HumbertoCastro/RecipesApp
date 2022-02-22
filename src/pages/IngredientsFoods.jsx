import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import recipesContext from '../context/recipesContext';

function IngredientsFoods() {
  const [apiResult, setApiResult] = useState({
    meals: [],
  });
  const {
    setApiSearch,
  } = useContext(recipesContext);
  const requestApi = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((x) => x.json()).then((y) => {
        y.meals.length = 12;
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
        apiResult.meals.map((x, index) => (
          <button
            type="button"
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-card` }
            onClick={ async () => {
              await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x.strIngredient}`)
                .then((xx) => xx.json()).then((resposta) => {
                  resposta.meals.length = 12;
                  setApiSearch(resposta);
                });
              history.push('/foods');
            } }
          >
            <img
              alt="ingredient img"
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${x.strIngredient}-Small.png` }
            />
            <p data-testid={ `${index}-card-name` }>{ x.strIngredient }</p>
          </button>
        ))
      }
      <Footer />
    </div>
  );
}
export default IngredientsFoods;
