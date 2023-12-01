import viewForm from "./views/viewForm.js";
import viewClients from "./views/viewClients.js";
import state from "./model.js";

//----------------------------//
const controlSubmit = async function () {
     if (viewForm.checkEmptyInput()) {
          viewForm.displayAlert();
          return;
     }

     const formData = viewForm.getFormData();
     state.newClient = { ...formData, id: Date.now() };
     // console.log(state.newClient); // CONSOLE

     try {
          await state.addClientDB(state.newClient);
          viewForm.displayMessage("added", "green");
          viewForm.formEl.reset();
     } catch (err) {
          console.error("Error adding client:", err);
          viewForm.displayMessage("no added", "red");
     }
     state.allClients = await state.getAllClients();
     // console.log(state.allClients); // CONSOLE

     viewClients.renderClientsList(state.allClients);
};
//----------------------------//

const controlNewClient = function () {
     viewForm.toggleForm();
};
//----------------------------//

const controlClientsList = function () {
     viewForm.closeForm();
     viewForm.formEl.reset();
};
//----------------------------//

const controlClientOptions = function (e) {
     if (e.target.closest(".icon-box")) {
          state.getClientId(e);

          console.log(state.clientId); // CONSOLE

          viewClients.toggleClientOptions(state.clientId);
     }
};
//----------------------------//

const controlDeleteClient = function (e) {
     if (e.target.classList.contains("clients_btn--delete")) {
          state.getClientId(e);
          state.deleteClientDB();
          console.log(state.clientId); // CONSOLE
     }
};
//----------------------------//

const init = async function () {
     viewForm.addHandlerNewClient(controlNewClient);
     viewForm.addHandlerSubmit(controlSubmit);
     viewClients.addHandlerClientsList(controlClientsList);
     viewClients.addHandlerClientsEvents([
          controlClientOptions,
          controlDeleteClient,
     ]);
     // viewClients.addHandlerClientsOptions(controlClientOptions);
     // viewClients.addHandlerClientsOptions(controlDeleteClient);

     await state.createDB();
     state.allClients = await state.getAllClients();
     viewClients.renderClientsList(state.allClients);
};
init();
