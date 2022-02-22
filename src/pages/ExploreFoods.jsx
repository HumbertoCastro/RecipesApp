import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();
  return (
    <div className="profile">
      <Header />
      <button
        className="profile-button"
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/foods/ingredients');
        } }
      >
        By Ingredient
      </button>
      <button
        className="profile-button"
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => {
          history.push('/explore/foods/nationalities');
        } }
      >
        By Nationality
      </button>
      <button
        className="profile-button"
        type="button"
        data-testid="explore-surprise"
        onClick={ async () => {
          const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then((x) => x.json());
          history.push(`/foods/${result.meals[0].idMeal}`);
        } }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}
export default ExploreFoods;
