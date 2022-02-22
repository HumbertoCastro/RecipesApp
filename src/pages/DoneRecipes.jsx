import React from 'react';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';

function DoneRecipes() {
  const dones = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(dones);
  return (
    <div>
      <Header />
      <RenderRecipes />
    </div>
  );
}

export default DoneRecipes;
