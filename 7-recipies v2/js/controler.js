/*****************************************/
/*****************************************/
import model from "./model.js";
import viewCategory from "./views/viewCategory.js";
/*****************************************/

const controlChangeCategory = async function () {
     const valueCategory = e.target.value;

     return valueCategory !== "Menu";
};
////////////////////////////////////////////

const init = async function () {
     try {
          // TEST mas adelante para ver si es necesario colocar un if si existe categoriesEl en favoritos

          const data = await model.getApiCategories();

          model.allCategories = data.categories.map((cat) => cat.strCategory);

          viewCategory.renderCategories(model.allCategories);
     } catch (error) {
          console.error(error);
     }

     viewCategory.addHandlerChangeCategory(controlChangeCategory);
};

init();
