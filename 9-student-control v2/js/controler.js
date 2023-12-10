//-----------------------------------------------//
//-----------------------------------------------//
import model from "./model.js";
import helper from "./helpers.js";
import viewApp from "./views/viewApp.js";
import viewForm from "./views/viewForm.js";
import viewInfo from "./views/viewInfo.js";
import viewPayments from "./views/viewPayments.js";

//*****************//

const checkEmptyInput = function () {
     return Array.from(viewForm.allInputsEl).some((el) => el.value === "");
};
//*****************//
const getFormData = function () {
     const formData = new FormData(viewForm.formEl);
     return Object.fromEntries(formData);
};
//*****************//
const createNewStudentObj = function (formData) {
     model.studentDataObj = {
          ...formData,
          id: Date.now(),
          payments: {},

          date: helper.createDate(),
     };
     console.log(model.studentDataObj); //CONSOLE
};

const controlNewStudent = function () {
     viewForm.switchBntText(model.editMode);
     helper.toggleWindow("open", [viewForm.modalBoxEl, viewForm.modalEl]);
};

//*****************//

const controlCancelForm = function () {
     helper.toggleWindow("close", [viewForm.modalBoxEl, viewForm.modalEl]);
};

//*****************//

const controlSubmitForm = async function () {
     if (checkEmptyInput()) {
          viewApp.displayMessage("Complete todos los campos", "alert");
          return;
     }

     if (!model.editMode) {
          try {
               createNewStudentObj(getFormData());

               // FIX

               await model.addStudentDB();

               model.Allstudents = await model.getAllSudentsDB();
               console.log(model.Allstudents); //CONSOLE

               viewForm.formEl.reset();
               viewApp.displayMessage("Agregado correctamente", "confirm");
               viewApp.displayStudentRows(
                    model.Allstudents,
                    model.selectedMonths,
                    model.selectedYear
               );
          } catch (error) {
               console.error("Error adding client:", error);
          }
     }
};
//*****************//
const controlChangeYear = function () {
     model.selectedYear = viewApp.readYearValue();
     console.log(model.selectedYear); //CONSOLE
     // viewApp.readCurrentMonths(model.month, model.quartersMonth);
};

//*****************//
const controlChangeMonths = function () {
     model.selectedMonths = viewApp.readMonthValue(model.quartersMonth);
     console.log(model.selectedMonths); //CONSOLE
};

//*****************//
const controlToggleOptions = async function (target) {
     const ref = target.closest(".student_name");
     const idClient = +ref.closest(".student").dataset.id;

     const optionExist = ref.querySelector(
          ".student_buttons .popup-options-student"
     );

     if (!optionExist) {
          viewApp.toggleClientOptions(ref);

          viewApp.btnInfoEl.onclick = () => {
               model.studentDataObj = model.Allstudents.find(
                    (student) => student.id === idClient
               );
               viewInfo.displayStudentInfo(model.studentDataObj);
          };
          viewApp.btnPaymentEl.onclick = () => {
               model.studentDataObj = model.Allstudents.find(
                    (student) => student.id === idClient
               );
               console.log(model.studentDataObj); //CONSOLE
               model.studentDataObj = viewPayments.setPayments(
                    model.studentDataObj,
                    model.selectedYear
               );
               viewPayments.addHandlerMarkInput();
               viewPayments.setAsPaid(model.studentDataObj, model.selectedYear);

               helper.toggleWindow("open", [
                    viewPayments.modalPaymentEl,
                    viewPayments.paymentEl,
               ]);

               viewApp.studentOptions = document.querySelector(
                    ".popup-options-student"
               );
               viewApp.studentOptions.remove();
          };
     } else {
          optionExist.remove();
     }
};
//*****************//

const controlDeleteStudent = async function (e) {
     const studentId = +viewInfo.infoBoxEl.dataset.id;

     try {
          // FIX

          await model.deleteStudentDB(studentId);
          model.Allstudents = await model.getAllSudentsDB();
          viewApp.displayStudentRows(
               model.Allstudents,
               model.selectedMonths,
               model.selectedYear
          );

          helper.toggleWindow("close", [viewInfo.infoEl, viewForm.modalBoxEl]);
     } catch (error) {
          console.error("Error deleting student:", error);
     }
};
//*****************//
const controlSavePayment = async function () {
     const allMonth = {};

     viewPayments.allCheckboxesPaymentEl.forEach((input) => {
          allMonth[input.id] = input.checked;
     });

     model.studentDataObj.payments[model.selectedYear] = allMonth;

     try {
          // FIX
          await model.updateStudentDB();
          model.Allstudents = await model.getAllSudentsDB();
          viewApp.displayStudentRows(
               model.Allstudents,
               model.selectedMonths,
               model.selectedYear
          );

          viewPayments.allCheckboxesPaymentEl.forEach((input) =>
               viewPayments.markInput(input, "deactivate")
          );

          viewPayments.formMonthsPaymentEl.reset();

          helper.toggleWindow("close", [
               viewPayments.modalPaymentEl,
               viewPayments.paymentEl,
          ]);
          console.log(model.Allstudents); //CONSOLE
     } catch (error) {
          console.error("Error saving payment:", error);
     }
};
//*****************//

//*****************//
const init = async function () {
     await model.createDB();
     model.year = helper.getCurrentYear();
     model.month = helper.getCurrentMonth();

     viewApp.createYearOptions();
     viewApp.setCurrentYear(model.year);
     viewApp.setCurrentMonths(model.month, model.quartersMonth);
     viewApp.addHandlerNewStudentBtn(controlNewStudent);
     viewApp.addHandlerChangeYear(controlChangeYear);
     viewApp.addHandlerChangeMonths(controlChangeMonths);
     viewApp.addHandlerToggleOptions(controlToggleOptions);

     viewForm.addHandlerCancelBtn(controlCancelForm);
     viewForm.addHandlerSubmitForm(controlSubmitForm);

     viewInfo.addHandlerDeleteStudent(controlDeleteStudent);

     viewPayments.addHelperToSavePaymentBtn(controlSavePayment);

     model.selectedYear = viewApp.readYearValue();
     model.selectedMonths = viewApp.readMonthValue(model.quartersMonth);

     model.Allstudents = await model.getAllSudentsDB();
     viewApp.displayStudentRows(
          model.Allstudents,
          model.selectedMonths,
          model.selectedYear
     );

     console.log("inicial:", model); //CONSOLE
};
init();
