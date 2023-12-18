/*****************************************/
/*****************************************/
import view from "./view.js";

class viewRecipe extends view {
     constructor() {
          super();
          this.modalContainerEl = document.querySelector(".modal_container");
          this.modalBoxEl = document.querySelector(".modal-box");
          this.imgRecipeEl = document.querySelector(".modal_img img");
          this.nameRecipeEl = document.querySelector(".modal_title");
          this.instructionsRecipeEl = document.querySelector(
               ".modal_instructions"
          );
          this.ingredientsEl = document.querySelector(
               ".modal_ingredients-list"
          );
          this.amountsEl = document.querySelector(".modal_ingredients-amount");
          this.btnCloseModalEl = document.querySelector(".btn-close");
          this.btnAddRemove = document.querySelector(".btn-add-remove");
     }
     ////////////////////////////////////////////

     renderSelectedRecipe(recipe) {
          const {
               idMeal: id,
               strInstructions: instructions,
               strMeal: name,
               strMealThumb: img,
          } = recipe;

          this.modalBoxEl.dataset.id = id;

          this.imgRecipeEl.src = `${img}`;
          this.imgRecipeEl.alt = `${name}`;

          this.nameRecipeEl.textContent = `${name}`;
          this.instructionsRecipeEl.textContent = `${instructions}`;

          this.clearElements(this.ingredientsEl);
          this.clearElements(this.amountsEl);

          for (let i = 1; i < 20; i++) {
               if (recipe[`strIngredient${i}`]) {
                    const ingredient = recipe[`strIngredient${i}`];
                    const amount = recipe[`strMeasure${i}`];

                    const liIngEl = document.createElement("LI");
                    liIngEl.textContent = ingredient;
                    this.ingredientsEl.appendChild(liIngEl);

                    const liAmoEl = document.createElement("LI");
                    liAmoEl.textContent = amount;
                    this.amountsEl.appendChild(liAmoEl);
               }
          }
     }

     ////////////////////////////////////////////
     togglePopUp() {
          const bodyEl = document.querySelector("body");
          this.modalContainerEl.classList.toggle("modal_container-open");
          this.modalBoxEl.classList.toggle("modal-box-open");

          this.modalContainerEl.classList.contains("modal_container-open")
               ? (bodyEl.style.overflow = "hidden")
               : (bodyEl.style.overflow = "auto");
     }

     ////////////////////////////////////////////
     clearElements(element) {
          while (element.firstChild) {
               element.removeChild(element.firstChild);
          }
     }

     ////////////////////////////////////////////
     toggleAddRemoveBnt = function (mode) {
          this.btnAddRemove.textContent = mode === true ? "Remove" : "Add";
          this.btnAddRemove.style.backgroundColor =
               mode === true ? "#e94e4e" : "#8bc926";
     };

     ////////////////////////////////////////////
     addHandlerClickAddRemove(handler) {
          this.btnAddRemove.addEventListener("click", handler);
     }

     ////////////////////////////////////////////

     addHandlerClickClosePopUp() {
          this.btnCloseModalEl.addEventListener(
               "click",
               this.togglePopUp.bind(this)
          );
     }
}

export default new viewRecipe();
