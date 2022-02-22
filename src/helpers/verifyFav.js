import { useContext } from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import recipesContext from '../context/recipesContext';

export default function VerifyFav(id) {
  const {
    setSrcImg,
  } = useContext(recipesContext);
  const favs = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favs !== null) {
    console.log('lint');
    favs.forEach((x) => console.log(x));
    if (favs.some((x) => x.id === id) && favs !== null) {
      setSrcImg(blackHeart);
    }
  } else {
    setSrcImg(whiteHeart);
  }
}
