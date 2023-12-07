//-----------------------------------------------//
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

     toggleForm(isOpen) {
          if (isOpen) {
               this.openForm();
               return;
          }

          this.closeForm();
     }

     //*****************//
     switchBntText(editMode) {
          this.formSubmitBtnEl.textContent = !editMode ? "agregar" : "editar";
     }

     //*****************//
     openForm() {
          this.modalBoxEl.classList.add("modal-box-open");
          this.modalEl.classList.add("modal-open");
     }
     //*****************//
     closeForm() {
          this.modalBoxEl.classList.remove("modal-box-open");
          this.modalEl.classList.remove("modal-open");

          this.formEl.reset();
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
