export const closeFormBtn = document.querySelector(".close_btn");
export const formEl = document.querySelector(".form");
const formBtn = document.querySelector(".form_btn");
const selCountryEl = document.getElementById("selection-country");

//*************************************//
export const addHandlerCloseForm = function (handler) {
     closeFormBtn.addEventListener("click", () => {
          handler();
     });
};
//*************************************//
export const addHandlerSubmitForm = function (handler) {
     formBtn.addEventListener("click", (e) => {
          handler(e);
     });
};

//*************************************//
export const createCountryOptions = function (countries) {
     const sortedCountries = countries
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));

     sortedCountries.forEach((country) => {
          const optionEl = document.createElement("OPTION");
          optionEl.value = country.code;
          optionEl.textContent = country.name;
          selCountryEl.appendChild(optionEl);
     });
};

//*************************************//

export const displayAlert = function (message) {
     const previousAlert = document.querySelector(".alert-message");

     if (previousAlert) return;

     const alertMessage = document.createElement("DIV");
     alertMessage.classList.add("alert-message");
     alertMessage.textContent = message;
     formEl.insertAdjacentElement("afterend", alertMessage);

     setTimeout(() => {
          alertMessage.remove();
     }, 4000);
};
