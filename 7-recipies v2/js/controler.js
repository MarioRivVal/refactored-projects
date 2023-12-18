/*****************************************/
/*****************************************/
import model from "./model.js";
import viewCategory from "./views/viewCategory.js";
import viewRecipe from "./views/viewRecipe.js";

/*****************************************/

const controlChangeCategory = async function (e) {
     const category = e.target.value;

     if (category === "Menu") return;

     await model.fetchRecipes(category);
     viewCategory.renderRecipes(model.allRecipes);
     viewCategory.containerEl.scrollIntoView({ behavior: "smooth" });

     model.setInitialRecipes(model.allRecipes);
};

////////////////////////////////////////////
const controlSelectRecipe = function (e) {
     const btnEl = e.target.closest(".recipe_btn");
     if (!btnEl) return;
     const id = btnEl.dataset.id;

     model.selectedRecipe = model.allRecipes.find((recipe) => {
          return recipe.idMeal === id;
     });

     viewRecipe.renderSelectedRecipe(model.selectedRecipe);
     viewRecipe.toggleAddRemoveBnt(model.isFavorite(id));
     viewRecipe.togglePopUp();
};

////////////////////////////////////////////
const controlAddRemoveFavorite = function () {
     const id = model.selectedRecipe.idMeal;

     model.isFavorite(id) ? model.removeFavorite(id) : model.addFavorite();

     const mode = model.isFavorite(id);
     viewRecipe.toggleAddRemoveBnt(mode);
     viewRecipe.displayMessage(mode);
};

////////////////////////////////////////////

const init = async function () {
     await model.fetchCategories();

     model.loadInitialRecipes();

     if (viewCategory.favoritesListEl)
          viewCategory.renderRecipe(model.getFavorites());

     viewCategory.renderCategories(model.allCategories);
     viewCategory.renderRecipes(model.allRecipes);

     viewCategory.addHandlerChangeCategory(controlChangeCategory);
     viewCategory.addHandlerClickRecipe(controlSelectRecipe);
     viewCategory.observeNavBar();

     viewRecipe.addHandlerClickClosePopUp();
     viewRecipe.addHandlerClickAddRemove(controlAddRemoveFavorite);
};

init();
