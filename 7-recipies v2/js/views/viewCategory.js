/*****************************************/
/*****************************************/
import view from "./view.js";

class ViewCategories extends view {
     constructor() {
          super();
          this.categoriesEl = document.getElementById("categories");
     }
     renderCategories(categories) {
          categories.forEach((category) => {
               const optionEl = document.createElement("OPTION");
               optionEl.value = category;
               optionEl.textContent = category;

               // TEST mas adelante para ver si es necesario el if
               if (this.categoriesEl) this.categoriesEl.appendChild(optionEl);
          });
     }

     ////////////////////////////////////////////
     addHandlerChangeCategory(handler) {
          this.categoriesEl.addEventListener("change", () => {
               handler();
          });
     }
}

export default new ViewCategories();
