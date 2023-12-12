//-----------------------------------------------//
import helper from "../helpers.js";
import viewApp from "./viewApp.js";
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

     loadStudentEdit(studentData) {
          const entriesArr = Object.entries(studentData);

          entriesArr.forEach((el) => {
               const key = el[0];
               const value = el[1];

               this.allInputsEl.forEach((input) => {
                    if (input.id === key) {
                         input.value = value;
                    }
               });
          });
     }
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
