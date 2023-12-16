/*****************************************/
/*****************************************/
import { API_URL } from "./config.js";
/*****************************************/

class Model {
     constructor() {
          this.Allrecipies = [];
          this.allCategories = [];
          this.selectedRecipe = null;
     }
     ////////////////////////////////////////////

     async getApiCategories() {
          try {
               const resp = await fetch(`${API_URL}categories.php`);
               const data = await resp.json();

               return data;
          } catch (error) {
               throw error;
          }
     }

     ////////////////////////////////////////////

     async getCategoryRecipies(category) {
          try {
          } catch (error) {
               throw error;
          }
     }
}

export default new Model();
