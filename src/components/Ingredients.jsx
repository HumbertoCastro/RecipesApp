import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CheckBoxIngredient from './CheckBoxIngredient';

function Ingredients({ element }) {
  const history = useHistory();
  const clk = (target) => {
    console.log(target.value);
    const { value } = target;
    const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let array = [value];
    if (history.location.pathname.includes('drinks')) {
      if (cocktails[element.idDrink] !== undefined) {
        array = cocktails[element.idDrink];
        array.push(value);
      }
      const newObject = {
        cocktails: {
          ...cocktails,
          [element.idDrink]: array,
        },
        meals: {
          ...meals,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
    } else {
      if (meals[element.idMeal] !== undefined) {
        array = meals[element.idMeal];
        array.push(value);
      }
      const newObject = {
        cocktails: {
          ...cocktails,
        },
        meals: {
          ...meals,
          [element.idMeal]: array,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      target.checked = true;
    }
  };
  const foodIngredient = Object.values(Object
    .fromEntries(Object
      .entries(element)
      .filter(([key]) => key.includes('strIngredient'))))
    .filter((x) => x !== null && x !== '');
  const foodMeasure = Object.values(Object
    .fromEntries(Object
      .entries(element)
      .filter(([key]) => key.includes('strMeasure'))))
    .filter((x) => x !== null && x !== '');
  const ing = '-ingredient-name-and-measure';
  const renderIngredients = () => {
    if (history.location.pathname.includes('/in-progress')) {
      return foodIngredient
        .map((x, i) => <CheckBoxIngredient key={ i } clk={ clk } ingr={ x } i={ i } />);
    }
    return foodIngredient
      .map((x, index) => (
        <div key={ `${index}-food-ingrediet` }>
          <li className="lis" key={ `${index}-food` } data-testid={ `${index}${ing}` }>
            <span>{ '<li>'}</span>
            <h1>{x}</h1>
            <span>{ '</li>'}</span>
          </li>
          <li
            key={ `${index}-` }
            data-testid={ `${index}${ing}` }
          >
            {foodMeasure[index]}
          </li>
        </div>
      ));
  };
  useEffect(() => {
    renderIngredients();
  }, []);
  return renderIngredients();
}

export default Ingredients;

Ingredients.propTypes = {
  element: PropTypes.shape({
    element: PropTypes.string.isRequired,
  }).isRequired,
};
