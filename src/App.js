import React, { useState, useEffect } from 'react';
import './App.css';
import FileForm from './components/FileForm/FileForm';
import IngredientsList from './components/IngredientsList/IngredientsList';
import RecipeList from './components/RecipeList/RecipeList';
import "@fontsource/inter";


function App() {
  return (
    <>
      <h1 class="title">
      Concoct  
        <span class="tooltiptext">
          Concoct uses artificial intelligence to recognize ingredients in the photo you upload to give you recipes that you can make.
        </span>
      </h1>
      <div class="bodyContainer">
        <FileForm />
      </div>
    </>
  );
}

export default App;
