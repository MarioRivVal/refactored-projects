/*****************************************/
/*****************************************/
import view from "./view.js";

class ViewCategories extends view {
     constructor() {
          super();
     }
     ////////////////////////////////////////////
     renderRecipes(recipes) {
          this.recipesListEl.innerHTML = "";

          recipes.forEach((recipe) => {
               const HTML = `
                  <div class="recipe">
                      <div class="recipe_img">
                          <img src="${
                               recipe.strMealThumb ?? recipe.img
                          }" alt="photo recipe ${
                    recipe.strMeal ?? recipe.name
               }" />
                      </div>
                      <div class="recipe_title">
                          <h3>${recipe.strMeal ?? recipe.name}</h3>
                      </div>
                      <div class="recipe_detail">
                          <p>
                              <span
                                  ><svg class="recipe_icon">
                                      <use
                                          xlink:href="svg/symbol-defs.svg#icon-meal"
                                      ></use></svg></span
                              >${recipe.strCategory ?? recipe.category}
                          </p>
                          <p>
                              <span>
                                  <svg class="recipe_icon">
                                      <use
                                          xlink:href="svg/symbol-defs.svg#icon-position"
                                      ></use></svg></span
                              >${recipe.strArea ?? recipe.origen}
                          </p>
                      </div>
                      <div data-id="${
                           recipe.idMeal ?? recipe.id
                      }" class="recipe_btn">
                          <div class="recipe_btn-layer"></div>
                          <button>receta</button>
                      </div> 
                  </div>
              `;

               this.recipesListEl.insertAdjacentHTML("beforeend", HTML);
          });

          recipes.length === 0
               ? this.switchTitle("off")
               : setTimeout(() => this.switchTitle("on"), 500);
     }

     ////////////////////////////////////////////
     renderCategories(categories) {
          categories.forEach((category) => {
               const optionEl = document.createElement("OPTION");
               optionEl.value = category;
               optionEl.textContent = category;

               if (this.categoriesEl) this.categoriesEl.appendChild(optionEl);
          });
     }

     ////////////////////////////////////////////
     addHandlerChangeCategory(handler) {
          this.categoriesEl.addEventListener("change", (e) => {
               handler(e);
          });
     }

     ////////////////////////////////////////////
     addHandlerClickRecipe(handler) {
          this.recipesListEl.addEventListener("click", (e) => {
               handler(e);
          });
     }
}

export default new ViewCategories();
