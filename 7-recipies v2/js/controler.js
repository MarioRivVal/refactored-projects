/*****************************************/
/*****************************************/
import model from "./model.js";
import view from "./views/view.js";
import viewCategory from "./views/viewCategory.js";
import viewRecipe from "./views/viewRecipe.js";

/*****************************************/

////////////////////////////////////////////
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

const init = async function () {
     // TEST mas adelante para ver si es necesario colocar un if si existe categoriesEl en favoritos
     await model.fetchCategories();

     model.loadInitialRecipes();
     viewCategory.renderCategories(model.allCategories);
     viewCategory.renderRecipes(model.allRecipes);

     viewCategory.addHandlerChangeCategory(controlChangeCategory);
     viewCategory.addHandlerClickRecipe(controlSelectRecipe);
     viewCategory.observeNavBar();

     viewRecipe.addHandlerClickClosePopUp();
};

init();
