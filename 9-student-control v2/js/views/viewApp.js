//-----------------------------------------------//
//-----------------------------------------------//

class ViewApp {
     constructor() {
          this.yearSelectEl = document.querySelector("#year-select");
          this.monthSelectEl = document.querySelector("#month-select");
          this.newStudentBtnEl = document.querySelector(".btn-new-client");
     }

     //*****************//

     createYearOptions() {
          for (let i = 0; i < 10; i++) {
               const option = document.createElement("OPTION");
               option.value = 2023 + i;
               option.textContent = 2023 + i;

               this.yearSelectEl.appendChild(option);
          }
     }
     //*****************//
     readCurrentYear(currentYear) {
          this.yearSelectEl.querySelectorAll("option").forEach((opt) => {
               if (opt.value === currentYear) {
                    this.yearSelectEl.value = opt.value;
               }
          });
     }

     //*****************//

     readCurrentMonths(currentMonth, quartersMonth) {
          this.monthSelectEl.querySelectorAll("option").forEach((opt) => {
               if (quartersMonth[opt.value].includes(currentMonth)) {
                    this.monthSelectEl.value = opt.value;
               }
          });
     }
     //*****************//

     displayMessage = function (message, type) {
          const color = type === "alert" ? "#c92a2a" : "#087f5b";

          const messageEl = document.createElement("DIV");
          messageEl.classList.add("popup-message");
          messageEl.style.backgroundColor = color;
          messageEl.style.display = "grid";

          const pEl = document.createElement("P");
          pEl.textContent = message;

          messageEl.appendChild(pEl);

          document.querySelector("body").appendChild(messageEl);

          setTimeout(() => {
               messageEl.remove();
          }, 3000);
     };
     //*****************//
     addHandlerNewStudent(handler) {
          this.newStudentBtnEl.addEventListener("click", () => {
               handler();
          });
     }
}

export default new ViewApp();
