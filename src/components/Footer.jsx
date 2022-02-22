import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const {
    setApiSearch,
  } = useContext(recipesContext);
  return (
    <div data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => {
          setApiSearch([]);
          history.push('/drinks');
        } }
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinkicon" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="exploreIcon" />
      </button>
      <button
        type="button"
        onClick={ () => {
          setApiSearch([]);
          history.push('/foods');
        } }
        data-testid="food-bottom-btn"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
    </div>
  );
}

export default Footer;
