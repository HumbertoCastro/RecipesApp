import React, { useContext, useState, useEffect } from 'react';
import ElementCardFoods from '../components/ElementCardFoods';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';

function Nationalities() {
  const [catNation, setCatNation] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestCat = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((x) => x.json()).then((y) => {
        console.log(y.meals);
        setLoading(false);
        setCatNation(y.meals);
      });
  };
  const {
    setApiSearch,
  } = useContext(recipesContext);

  const renderNation = () => (
    <select
      data-testid="explore-by-nationality-dropdown"
      name="nations"
      onChange={ async () => {
        const selected = document.querySelector('select').value;
        if (selected === '') {
          setApiSearch([]);
        } else {
          await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`)
            .then((xx) => xx.json()).then((resposta) => {
              resposta.meals.length = 12;
              setApiSearch(resposta);
            });
        }
      } }
    >
      {
        catNation.map((x, index) => (
          <option
            data-testid={ `${x.strArea}-option` }
            key={ `${index}-option` }
            value={ x.strArea }
          >
            { x.strArea }
          </option>
        ))
      }
      <option data-testid="All-option" value="">All</option>
    </select>
  );
  useEffect(() => {
    console.log(renderNation());
    console.log(setApiSearch);
    console.log(catNation);
    requestCat();
  }, []);
  return (
    <div>
      <Header />
      {
        loading ? null : renderNation()
      }
      <ElementCardFoods />
      <Footer />
    </div>
  );
}

export default Nationalities;
