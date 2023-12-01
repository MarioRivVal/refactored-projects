class ViewForm {
     constructor() {
          this.newClientaBtn = document.querySelector(".new-client-btn");
          this.newClientsBoxEl = document.querySelector(".new-clients");
          this.formEl = document.querySelector("form");
     }
     //----------------------------//

     toggleForm() {
          this.newClientsBoxEl.classList.toggle("new-clients--active");
     }
     //----------------------------//

     closeForm() {
          this.newClientsBoxEl.classList.remove("new-clients--active");
     }
     //----------------------------//
     checkEmptyInput() {
          const inputs = [...this.formEl.elements];
          const emptyInputs = inputs.filter(
               (input) => input.value === "" && input.type !== "submit"
          );
          return emptyInputs.length > 0;
     }
     //----------------------------//
     //----------------------------//
     displayAlert() {
          const previousAlert = this.formEl.querySelector(".alert-message");

          if (previousAlert) return;

          const alertMessage = document.createElement("P");
          alertMessage.textContent = "All fields are required";
          alertMessage.classList.add("alert-message");
          this.formEl.insertBefore(
               alertMessage,
               this.formEl.querySelector(".form_btn")
          );

          setTimeout(() => {
               alertMessage.remove();
          }, 2000);
     }
     //----------------------------//
     getFormData() {
          const formData = new FormData(this.formEl);
          const objFormData = Object.fromEntries(formData);
          return objFormData;
     }
     //----------------------------//

     displayMessage(message, color) {
          const messageHTML = `<div class="message-box"><p class="p ${color}">client ${message}</p></div>`;

          this.formEl.insertAdjacentHTML("afterend", messageHTML);

          setTimeout(() => {
               document.querySelector(".message-box").remove();
               this.formEl.reset();
          }, 3000);
     }
     //----------------------------//
     addHandlerNewClient(handler) {
          this.newClientaBtn.addEventListener("click", handler);
     }
     //----------------------------//
     addHandlerSubmit(handler) {
          this.formEl.addEventListener("submit", (e) => {
               e.preventDefault();
               handler();
          });
     }
}

export default new ViewForm();
