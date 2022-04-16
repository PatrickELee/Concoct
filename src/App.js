import './App.css';
import FileForm from './components/FileForm/FileForm';
import IngredientsList from './components/IngredientsList/IngredientsList';
import Recipe from './components/Recipe/Recipe'
import RecipeList from './components/RecipeList/RecipeList'
import "@fontsource/inter";

function App() {
  return (
    <>
      <h1 class="title">Recipe Finder</h1>
      <div class="bodyContainer">
        <FileForm />
        <hr />
        <IngredientsList />
        <hr />
        <RecipeList />
      </div>
    </>
  );
}

export default App;
