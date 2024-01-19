//-----------------------------------------------//
//-----------------------------------------------//

import viewPayments from "./viewPayments.js";

//*****************//

class ViewApp {
     constructor() {
          this.yearSelectEl = document.querySelector("#year-select");
          this.monthSelectEl = document.querySelector("#month-select");
          this.newStudentBtnEl = document.querySelector(".btn-new-student");
          this.changeBillNumberBtnEl = document.querySelector(".btn-edit-bill");

          this.studentsListEl = document.querySelector(".main_students-list");
          this.studentOptions = null;

          this.btnInfoEl = null;
          this.btnPaymentEl = null;
          this.btnEditEl = null;
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
     setCurrentYear(currentYear) {
          this.yearSelectEl.querySelectorAll("option").forEach((opt) => {
               if (+opt.value === currentYear) {
                    this.yearSelectEl.value = opt.value;
               }
          });
     }

     //*****************//

     setCurrentMonths(currentMonth, quartersMonth) {
          this.monthSelectEl.querySelectorAll("option").forEach((opt) => {
               if (quartersMonth[opt.value].includes(currentMonth)) {
                    this.monthSelectEl.value = opt.value;
               }
          });
     }
     //*****************//
     readYearValue() {
          return this.yearSelectEl.value;
     }
     //*****************//
     readMonthValue(quartersMonth) {
          return quartersMonth[this.monthSelectEl.value];
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

     displayStudentRows(allStudentsData, selectedMonths, selectedYear) {
          this.studentsListEl.innerHTML = "";

          allStudentsData.forEach((student) => {
               const { name, surname, id } = student;

               const studentRowHTML = `
               <div class="student" data-id = "${id}">
              <div class="checkboxes"></div>
              <div class="student_name">
                  <p>${name} ${surname}</p>
                  <div class="student_buttons">
                      <button class="btn-icon student-btn">
                      <svg class="icon">
                      <use
                         xlink:href="img/svg/sprite.svg#arrow-left"
                         ></use>
                      </svg>
                      </button>
                  </div>
              </div>
              <div class="checkboxes">
                  <div class="checkbox-group">
                      <input
                          type="checkbox"
                          id="checkbox${id}-print"
                          class="print_checkbox-input"
                      />
                      <label for="checkbox${id}-print" class="checkbox">
                          <span class="checkmark"></span>
                      </label>
                  </div>
              </div>
          </div>
              `;
               this.studentsListEl.insertAdjacentHTML(
                    "afterbegin",
                    studentRowHTML
               );

               this.createCheckBoxesClient(
                    student,
                    selectedMonths,
                    selectedYear
               );
          });
     }
     //*****************//
     createCheckBoxesClient(student, selectedMonths, selectedYear) {
          let yearArray;

          if (student.payments[selectedYear])
               yearArray = Object.entries(student.payments[selectedYear]);

          for (let i = 0; i < 3; i++) {
               let n = i + 1;

               const divEl = document.createElement("DIV");
               divEl.classList.add("checkbox-group");

               const inputEl = document.createElement("INPUT");
               inputEl.type = "checkbox";
               inputEl.id = `checkbox${student.id}-${n}`;
               inputEl.classList.add("student_checkbox-input");
               inputEl.dataset.year = selectedYear;
               inputEl.dataset.month = selectedMonths[i];
               inputEl.disabled = true;

               const labelEl = document.createElement("LABEL");
               labelEl.htmlFor = `checkbox${student.id}-${n}`;
               labelEl.classList.add("checkbox");

               const spanEl = document.createElement("SPAN");
               spanEl.classList.add("checkmark");

               labelEl.appendChild(spanEl);

               divEl.appendChild(inputEl);
               divEl.appendChild(labelEl);

               document.querySelector(".checkboxes").appendChild(divEl);

               if (yearArray) this.markIfPayed(inputEl, yearArray);
          }
     }
     //*****************//
     toggleClientOptions(ref) {
          const anyOption = document.querySelector(
               ".student_name .student_buttons .popup-options-student"
          );

          if (anyOption) anyOption.remove();

          const optionEl = document.createElement("DIV");
          optionEl.classList.add("popup-options-student");

          this.btnInfoEl = document.createElement("BUTTON");
          this.btnInfoEl.classList.add("btn", "btn-info");
          this.btnInfoEl.textContent = "info";

          this.btnPaymentEl = document.createElement("BUTTON");
          this.btnPaymentEl.classList.add("btn", "btn-payment");
          this.btnPaymentEl.textContent = "pagos";

          this.btnEditEl = document.createElement("BUTTON");
          this.btnEditEl.classList.add("btn", "btn-edit");
          this.btnEditEl.textContent = "editar";

          optionEl.appendChild(this.btnInfoEl);
          optionEl.appendChild(this.btnPaymentEl);
          optionEl.appendChild(this.btnEditEl);

          ref.querySelector(".student_buttons").appendChild(optionEl);
     }
     //*****************//
     removeClientOptions() {
          const anyOption = document.querySelector(
               ".student_name .student_buttons .popup-options-student"
          );

          if (anyOption) anyOption.remove();
     }
     //*****************//
     markIfPayed(input, yearArray) {
          const inputMonth = input.dataset.month;

          yearArray.forEach((el) => {
               let keyMonth = el[0];
               let valueBoolean = el[1];

               if (inputMonth === keyMonth && valueBoolean === true) {
                    viewPayments.markInput(input, "active");
               }
          });
     }
     //*****************//
     addHandlerNewStudentBtn(handler) {
          this.newStudentBtnEl.addEventListener("click", () => {
               handler();
          });
     }
     //*****************//
     addHandlerChangeYear(handler) {
          this.yearSelectEl.addEventListener("change", () => {
               handler();
          });
     }
     //*****************//
     addHandlerChangeMonths(handler) {
          this.monthSelectEl.addEventListener("change", () => {
               handler();
          });
     }
     //*****************//
     addHandlerChangeBillNumberBnt(handler) {
          this.changeBillNumberBtnEl.addEventListener("click", () => {
               handler();
          });
     }
     //*****************//
     addHandlerToggleOptions(handler) {
          this.studentsListEl.addEventListener("click", (e) => {
               const btn = e.target.closest(".student-btn");

               if (btn) {
                    handler(btn);
               }
          });
     }
}

export default new ViewApp();
