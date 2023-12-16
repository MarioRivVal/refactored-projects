//-----------------------------------------------//
//-----------------------------------------------//
class ViewPayments {
     constructor() {
          this.paymentStudentNameEl = document.querySelector(
               ".payment_title-box .payment-name"
          );
          this.paymentStudentYearEl = document.querySelector(
               ".payment_title-box .payment-year"
          );
          this.allCheckboxesPaymentEl = document.querySelectorAll(
               ".payment_checkbox-input"
          );

          this.modalPaymentEl = document.querySelector(".modal-payment");
          this.paymentEl = document.querySelector(".payment");
          this.savePaymentBtnEl = document.querySelector(".payment-btn");
          this.formMonthsPaymentEl = document.querySelector(".payment_months");
     }

     //*****************//
     setPayments(studentData, selectedYear) {
          const { name, surname, payments } = studentData;

          this.paymentStudentNameEl.textContent = `${name} ${surname}`;
          this.paymentStudentYearEl.textContent = selectedYear;

          const newStudentPayments = {
               ...studentData,
               payments: { ...payments, [selectedYear]: {} },
          };

          this.allCheckboxesPaymentEl.forEach((input) => {
               const month = input.id;

               newStudentPayments.payments[selectedYear] = {
                    ...newStudentPayments.payments[selectedYear],
                    [month]: false,
               };
          });

          return newStudentPayments;
     }
     //*****************//
     markInput(inputEl, action) {
          const checkmark =
               inputEl.nextElementSibling.querySelector(".checkmark");
          const label = inputEl.nextElementSibling;

          if (action === "active") {
               checkmark.style.display = "block";
               inputEl.checked = true;
               label.classList.add("checkbox-hover-effect");
          } else {
               checkmark.style.display = "none";
               inputEl.checked = false;
               label.classList.remove("checkbox-hover-effect");
          }
     }
     //*****************//
     setAsPaid(studentData, selectedYear) {
          const monthArr = Object.entries(studentData.payments[selectedYear]);

          monthArr.forEach((el) => {
               const keyMonth = el[0];
               const valueBoolean = el[1];

               this.allCheckboxesPaymentEl.forEach((input) => {
                    if (valueBoolean === true && keyMonth === input.id) {
                         this.markInput(input, "active");
                    }
               });
          });
     }
     //*****************//
     addHandlerMarkInput() {
          this.allCheckboxesPaymentEl.forEach((input) => {
               input.addEventListener("click", (e) => {
                    const input = e.target;

                    if (input.checked) {
                         this.markInput(input, "active");
                    } else {
                         this.markInput(input, "deactivate");
                    }
               });
          });
     }
     //*****************//
     addHelperToSavePaymentBtn(handler) {
          this.savePaymentBtnEl.addEventListener("click", handler);
     }
}

export default new ViewPayments();
