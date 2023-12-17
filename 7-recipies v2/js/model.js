/*****************************************/
/*****************************************/
import { API_URL } from "./config.js";
/*****************************************/

class Model {
     constructor() {
          this.allRecipes = [];

          this.allCategories = [];
          this.selectedRecipe = null;
          this.favorites = [];
     }
     ////////////////////////////////////////////

     async fetchCategories() {
          try {
               const resp = await fetch(`${API_URL}categories.php`);
               const data = await resp.json();
               this.allCategories = data.categories.map(
                    (cat) => cat.strCategory
               );
          } catch (error) {
               console.error(error);
               throw error;
          }
     }

     ////////////////////////////////////////////

     async fetchRecipes(category) {
          try {
               const resp = await fetch(`${API_URL}filter.php?c=${category}`);
               const data = await resp.json();

               const ids = data.meals.map((meal) => meal.idMeal);

               const promises = ids.map((id) => {
                    return fetch(`${API_URL}lookup.php?i=${id}`);
               });

               const responses = await Promise.all(promises);

               const dataPromises = responses.map((resp) => resp.json());

               const recipes = await Promise.all(dataPromises);

               this.allRecipes = recipes.map((recipe) => recipe.meals[0]);
          } catch (error) {
               console.error(error);
               throw error;
          }
     }
     ////////////////////////////////////////////

     setInitialRecipes(recipes) {
          JSON.parse(localStorage.getItem("inicialRecipies")) ?? [];

          localStorage.setItem("inicialRecipes", JSON.stringify(recipes));
     }
     ////////////////////////////////////////////

     loadInitialRecipes() {
          const recipes = JSON.parse(localStorage.getItem("inicialRecipes"));

          this.allRecipes = recipes;
     }
     ////////////////////////////////////////////
     isFavorite(id) {
          // TEST MAS ADELANTE PARA CREAR UN ARRAY FAV EN MODEL
          const favorities =
               JSON.parse(localStorage.getItem("favorities")) ?? [];

          return favorities.some((recipe) => recipe.id === id);
     }
}

export default new Model();
