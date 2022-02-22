import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RenderDetailsDrink from '../components/RenderDetailsDrink';
import RenderDetailsFood from '../components/RenderDetailsFood';

function InProgress() {
  const [response, setResponse] = useState([]);
  const history = useHistory();
  const handleFinish = () => {
    history.push('/done-recipes');
  };
  const requestWithId = () => {
    const href = document.location.href.split('/');
    const idFood = href[href.length - 2];
    if (history.location.pathname.includes('/foods')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`)
        .then((x) => x.json()).then((y) => {
          setResponse(y);
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idFood}`)
        .then((x) => x.json()).then((y) => {
          setResponse(y);
        });
    }
    const finish = document.querySelector('.finish-btn');
    finish.disabled = true;
  };
  useEffect(() => {
    requestWithId();
  }, []);
  const renderProgress = () => {
    console.log(response);
    if (history.location.pathname.includes('/foods')) {
      return (
        <div>
          <RenderDetailsFood res={ response.meals[0] } />
        </div>
      );
    }
    return (
      <div>
        <RenderDetailsDrink res={ response.drinks[0] } />
      </div>
    );
  };
  return (
    <div>
      {
        response.length === 0 ? null : renderProgress()
      }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish-btn"
        onClick={ handleFinish }
      >
        finish
      </button>
    </div>
  );
}
export default InProgress;
