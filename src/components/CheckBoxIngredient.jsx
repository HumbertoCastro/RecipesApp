import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CheckBoxIngredient({ ingr, clk, i }) {
  const [check, setCheck] = useState(false);
  const validateCheck = () => {
    let { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    cocktails = Object.values(cocktails);
    meals = Object.values(meals);
    if (meals.some((x) => x.some((y) => y === ingr))
     || cocktails.some((x) => x.some((y) => y === ingr))) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const onClickBtn = ({ target }) => {
    target.checked = true;
    setCheck(true);
    const inputs = document.querySelectorAll('.checkboxes');
    const finish = document.querySelector('.finish-btn');
    finish.disabled = false;
    for (let z = 0; z < inputs.length; z += 1) {
      if (inputs[z].checked === false) {
        console.log(inputs[z].checked);
        finish.disabled = true;
      }
    }
    clk(target);
  };

  useEffect(() => {
    validateCheck();
  }, []);

  return (
    <div
      key={ `${i}-food-ingrediet` }
      data-testid={ `${i}-ingredient-step` }
    >
      <input
        type="checkbox"
        key={ `${i}-food` }
        name={ `${i}-checkbox` }
        className="checkboxes"
        onClick={ onClickBtn }
        defaultChecked={ check }
        checked={ check }
        value={ ingr }
      />
      <label htmlFor={ `${i}-checkbox` }>{ ingr }</label>
    </div>
  );
}
export default CheckBoxIngredient;

CheckBoxIngredient.propTypes = {
  ingr: PropTypes.string.isRequired,
  clk: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
};
