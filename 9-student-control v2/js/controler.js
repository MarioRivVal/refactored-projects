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
};

//*****************//
const upDateDisplay = async function () {
     model.Allstudents = await model.getAllSudentsDB();
     viewApp.displayStudentRows(
          model.Allstudents,
          model.selectedMonths,
          model.selectedYear
     );
};
//*****************//
const controlNewStudent = function () {
     console.log(model.editMode); //CONSOLE
     model.editMode = false;
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

               await model.addStudentDB();
               upDateDisplay();

               console.log(model.Allstudents); //CONSOLE
               viewApp.displayMessage("Agregado correctamente", "confirm");
               viewForm.formEl.reset();
          } catch (error) {
               console.error("Error adding client:", error);
          }
     } else {
          try {
               model.editedStudentObj = model.studentDataObj;

               viewForm.allInputsEl.forEach((el) => {
                    model.editedStudentObj[el.id] = el.value;
               });
               console.log(model.editedStudentObj); //CONSOLE

               await model.updateStudentDB(model.editedStudentObj);

               upDateDisplay();
               console.log(model.Allstudents); //CONSOLE

               viewApp.displayMessage("Editado correctamente", "confirm");
               viewForm.formEl.reset();

               controlCancelForm();

               model.editMode = false;
          } catch (error) {
               console.error("Error editing student:", error);
          }
     }
};
//*****************//
const controlChangeYear = function () {
     model.selectedYear = viewApp.readYearValue();
     console.log(model.selectedYear); //CONSOLE
     viewApp.displayStudentRows(
          model.Allstudents,
          model.selectedMonths,
          model.selectedYear
     );
};

//*****************//
const controlChangeMonths = function () {
     model.selectedMonths = viewApp.readMonthValue(model.quartersMonth);
     console.log(model.selectedMonths); //CONSOLE
     viewApp.displayStudentRows(
          model.Allstudents,
          model.selectedMonths,
          model.selectedYear
     );
};

//*****************//
const controlToggleOptions = async function (target) {
     const ref = target.closest(".student_name");
     const idClient = +ref.closest(".student").dataset.id;

     model.studentDataObj = model.Allstudents.find(
          (student) => student.id === idClient
     );

     const optionExist = ref.querySelector(
          ".student_buttons .popup-options-student"
     );

     if (!optionExist) {
          viewApp.toggleClientOptions(ref);

          viewApp.btnInfoEl.onclick = () => {
               viewInfo.displayStudentInfo(model.studentDataObj);
          };

          viewApp.btnPaymentEl.onclick = () => {
               if (!model.studentDataObj.payments[model.selectedYear]) {
                    model.studentDataObj = viewPayments.setPayments(
                         model.studentDataObj,
                         model.selectedYear
                    );
               } else {
                    viewPayments.setAsPaid(
                         model.studentDataObj,
                         model.selectedYear
                    );
               }

               viewPayments.addHandlerMarkInput();

               helper.toggleWindow("open", [
                    viewPayments.modalPaymentEl,
                    viewPayments.paymentEl,
               ]);

               viewApp.removeClientOptions();
               console.log(model.studentDataObj); //CONSOLE
          };

          viewApp.btnEditEl.onclick = () => {
               model.editMode = true;
               viewForm.switchBntText(model.editMode);
               viewForm.loadStudentEdit(model.studentDataObj);

               helper.toggleWindow("open", [
                    viewForm.modalBoxEl,
                    viewForm.modalEl,
               ]);

               viewApp.removeClientOptions();

               console.log(model.editMode); //CONSOLE
          };

          return;
     }
     optionExist.remove();
};
//*****************//

const controlDeleteStudent = async function (e) {
     const studentId = +viewInfo.infoBoxEl.dataset.id;

     try {
          await model.deleteStudentDB(studentId);
          upDateDisplay();

          helper.toggleWindow("close", [viewInfo.infoEl, viewForm.modalBoxEl]);
     } catch (error) {
          console.error("Error deleting student:", error);
     }
};
//*****************//
const controlSavePayment = async function () {
     const allMonth = {};

     viewPayments.allCheckboxesPaymentEl.forEach((input) => {
          if (input.checked) {
               allMonth[input.id] = true;
          } else {
               allMonth[input.id] = false;
          }
     });

     model.studentDataObj.payments[model.selectedYear] = allMonth;

     try {
          await model.updateStudentDB(model.studentDataObj);

          upDateDisplay();

          viewPayments.allCheckboxesPaymentEl.forEach((input) =>
               viewPayments.markInput(input, "deactivate")
          );

          viewPayments.formMonthsPaymentEl.reset();

          helper.toggleWindow("close", [
               viewPayments.modalPaymentEl,
               viewPayments.paymentEl,
          ]);
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
