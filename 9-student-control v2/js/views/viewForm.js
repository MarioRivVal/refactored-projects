//-----------------------------------------------//
import helper from "../helpers.js";
//-----------------------------------------------//
class ViewForm {
     constructor() {
          this.formEl = document.querySelector(".modal form");
          this.formSubmitBtnEl = document.querySelector(".form_new-client-btn");
          this.formCancelBtnEl = document.querySelector(".form_cancel-btn");
          this.modalBoxEl = document.querySelector(".modal-box");
          this.modalEl = document.querySelector(".modal");
          this.infoEl = document.querySelector(".modal-info");

          this.allInputsEl = document.querySelectorAll(".form_group input");
     }

     //*****************//

     //*****************//
     switchBntText(editMode) {
          this.formSubmitBtnEl.textContent = !editMode ? "agregar" : "editar";
     }

     //*****************//
     addHandlerSubmitForm(handler) {
          this.formEl.addEventListener("submit", (e) => {
               e.preventDefault();
               handler();
          });
     }
     //*****************//
     addHandlerCancelBtn(handler) {
          this.formCancelBtnEl.addEventListener("click", (e) => {
               handler();
          });
     }
}

export default new ViewForm();
