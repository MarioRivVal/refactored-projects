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

const controlNewStudent = function () {
     viewForm.switchBntText(model.editMode);
     viewForm.toggleForm(true);
};

//*****************//

const controlSubmitForm = function () {
     if (checkEmptyInput()) {
          viewApp.displayMessage("Complete todos los campos", "alert");
          return;
     }

     if (!model.editMode) {
          createNewStudentObj(getFormData());
          // agregar a la base de datos
          // agregar al state
          // agregar a la vista
          // cerra el form
          // resetear el form
          // mostrar mensaje de confirmacion
     }
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
          years: {},

          date: helper.createDate(),
     };
     console.log(model.studentDataObj); //CONSOLE
};
//*****************//

const controlCancelForm = function () {
     viewForm.toggleForm(false);
};

//*****************//
const init = async function () {
     await model.createDB();
     model.year = helper.getCurrentYear();
     model.month = helper.getCurrentMonth();
     viewApp.createYearOptions();
     viewApp.readCurrentYear(model.year);
     viewApp.readCurrentMonths(model.month, model.quartersMonth);
     viewApp.addHandlerNewStudent(controlNewStudent);

     viewForm.addHandlerCancelBtn(controlCancelForm);
     viewForm.addHandlerSubmitForm(controlSubmitForm);
};
init();

console.log(model); //CONSOLE
