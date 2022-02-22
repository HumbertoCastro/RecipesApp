import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();
  return (
    <div className="profile">
      <Header />
      <button
        type="button"
        className="profile-button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/drinks/ingredients');
        } }
      >
        By Ingredient
      </button>
      <button
        type="button"
        className="profile-button"
        data-testid="explore-surprise"
        onClick={ async () => {
          const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then((x) => x.json());
          console.log(result);
          history.push(`/drinks/${result.drinks[0].idDrink}`);
        } }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}
export default ExploreDrinks;
