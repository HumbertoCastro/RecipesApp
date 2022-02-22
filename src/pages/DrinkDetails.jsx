import React, { useEffect, useState } from 'react';
import RenderDetailsDrink from '../components/RenderDetailsDrink';

function DrinkDetails() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [res, setResponse] = useState([]);
  function requestWithId() {
    const href = document.location.href.split('/');
    const idFood = href[href.length - 1];
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idFood}`)
      .then((x) => x.json()).then((y) => {
        setResponse(y);
      });
  }
  useEffect(() => {
    requestWithId();
  }, []);
  return (
    <div className="details">
      {
        res.length === 0 ? null : <RenderDetailsDrink res={ res.drinks[0] } />
      }
    </div>
  );
}

export default DrinkDetails;
