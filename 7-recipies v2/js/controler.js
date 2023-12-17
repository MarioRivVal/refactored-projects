/*****************************************/
/*****************************************/
import model from "./model.js";
import view from "./views/view.js";
import viewCategory from "./views/viewCategory.js";

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

const init = async function () {
     // TEST mas adelante para ver si es necesario colocar un if si existe categoriesEl en favoritos
     await model.fetchCategories();

     viewCategory.renderCategories(model.allCategories);
     model.loadInitialRecipes();
     viewCategory.renderRecipes(model.inicialRecipes);

     viewCategory.addHandlerChangeCategory(controlChangeCategory);
     viewCategory.observeNavBar();
};

init();
