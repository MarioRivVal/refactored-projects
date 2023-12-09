//-----------------------------------------------//
//-----------------------------------------------//
import model from "./model.js";
import helper from "./helpers.js";
import viewApp from "./views/viewApp.js";
import viewForm from "./views/viewForm.js";

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
const controlToggleOptions = function (target) {
     const ref = target.closest(".student_name");
     const idClient = +ref.closest(".student").dataset.id;

     const optionExist = ref.querySelector(
          ".student_buttons .popup-options-student"
     );
     const studentData = model.Allstudents.find(
          (student) => student.id === idClient
     );

     if (!optionExist) {
          viewApp.toggleClientOptions(studentData, ref);
     } else {
          optionExist.remove();
     }
};
//*****************//
const init = async function () {
     await model.createDB();
     model.year = helper.getCurrentYear();
     model.month = helper.getCurrentMonth();
     model.selectedYear = viewApp.readYearValue();
     model.selectedMonths = viewApp.readMonthValue(model.quartersMonth);

     viewApp.createYearOptions();
     viewApp.readCurrentYear(model.year);
     viewApp.readCurrentMonths(model.month, model.quartersMonth);
     viewApp.addHandlerNewStudentBtn(controlNewStudent);
     viewApp.addHandlerChangeYear(controlChangeYear);
     viewApp.addHandlerChangeMonths(controlChangeMonths);
     viewApp.addHandlerToggleOptions(controlToggleOptions);

     viewForm.addHandlerCancelBtn(controlCancelForm);
     viewForm.addHandlerSubmitForm(controlSubmitForm);

     model.Allstudents = await model.getAllSudentsDB();
     viewApp.displayStudentRows(
          model.Allstudents,
          model.selectedMonths,
          model.selectedYear
     );

     console.log(model); //CONSOLE
};
init();
