import React, { useEffect, useState } from 'react';
import RenderDetailsFood from '../components/RenderDetailsFood';

function FoodDetails() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [response, setResponse] = useState([]);

  const requestWithId = () => {
    const href = document.location.href.split('/');
    const idFood = href[href.length - 1];
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`)
      .then((x) => x.json()).then((y) => {
        setResponse(y);
      })
      .catch(() => 'erro');
  };
  useEffect(() => {
    requestWithId();
  }, []);
  return (
    <div className="details">
      {
        response.length === 0 ? null : <RenderDetailsFood res={ response.meals[0] } />
      }
    </div>
  );
}

export default FoodDetails;
