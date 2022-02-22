export default function saveRecipe(favObject) {
  if (localStorage.getItem('favoriteRecipes') !== null) {
    const oldFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    oldFavs.push(favObject);
    console.log(oldFavs);

    localStorage.setItem('favoriteRecipes', JSON.stringify(oldFavs));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favObject]));
  }
}
