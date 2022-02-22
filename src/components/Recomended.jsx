import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Recomended() {
  const history = useHistory();
  const [response, setResponse] = useState([]);
  const request = () => {
    if (history.location.pathname.includes('foods')) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((x) => x.json()).then((y) => {
          const { meals } = y;
          meals.length = 6;
          setResponse(meals.map((x) => ({
            name: x.strMeal,
            src: x.strMealThumb,
          })));
        });
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((x) => x.json()).then((y) => {
          const { drinks } = y;
          drinks.length = 6;
          setResponse(drinks.map((x) => ({
            name: x.strDrink,
            src: x.strDrinkThumb,
          })));
        });
    }
  };
  useEffect(() => {
    request();
  }, []);

  const renderRecomended = () => (
    <div className="recomended-cards">
      {
        response.map((x, index) => (
          <div key={ x.name } data-testid={ `${index}-recomendation-card` }>
            <img src={ x.src } alt={ x.name } width="50px" />
            <h1 data-testid={ `${index}-recomendation-title` }>{ x.name }</h1>
          </div>
        ))
      }
    </div>
  );
  return (
    <div className="recomended">
      {
        response.length === 0 ? null : renderRecomended()
      }
    </div>
  );
}

export default Recomended;
