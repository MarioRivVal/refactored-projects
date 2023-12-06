import viewForm from "./views/viewForm.js";
import viewClients from "./views/viewClients.js";
import state from "./model.js";

//----------------------------//
const controlSubmit = async function () {
     if (viewForm.editMode) {
          const editedFormData = viewForm.getFormData();
          state.currentClient = { ...editedFormData, id: state.clientId };

          try {
               await state.editClientDB();

               resetAllStates();
          } catch (error) {
               viewForm.displayMessage("no edited", "red");
          }
     } else {
          if (viewForm.checkEmptyInput()) {
               viewForm.displayAlert();
               return;
          }

          const formData = viewForm.getFormData();
          state.currentClient = { ...formData, id: Date.now() };

          try {
               await state.addClientDB();

               resetAllStates();
          } catch (err) {
               console.error("Error adding client:", err);
               viewForm.displayMessage("no added", "red");
          }
     }
};
//----------------------------//

const resetAllStates = async function () {
     viewForm.formEl.reset();
     viewForm.toggleForm();
     state.allClients = await state.getAllClients();
     viewClients.renderClientsList(state.allClients);
};
//----------------------------//

const controlNewClient = function () {
     viewForm.editMode = false;
     viewForm.toggleForm();
};
//----------------------------//

const controlClientsList = function () {
     viewForm.closeForm();
     viewForm.formEl.reset();
     viewForm.editMode = false;
};
//----------------------------//

const controlClientOptions = function (e) {
     if (e.target.closest(".icon-box")) {
          state.getClientId(e);

          viewClients.toggleClientOptions(state.clientId);
     }
};
//----------------------------//

const controlDeleteClient = async function (e) {
     if (e.target.classList.contains("clients_btn--delete")) {
          state.getClientId(e);

          const confirmation = confirm(
               "Do you really want to delete this client?"
          );

          if (confirmation) {
               try {
                    await state.deleteClientDB();
                    state.allClients = await state.getAllClients();
                    viewClients.renderClientsList(state.allClients);
               } catch (error) {
                    viewForm.displayMessage(" no deleted", "red");
               }
          }
     }
};
//----------------------------//
const controlEditClient = function (e) {
     if (e.target.classList.contains("clients_btn--edit")) {
          viewForm.editMode = true;

          state.getClientId(e);
          const client = state.allClients.find(
               (client) => client.id === state.clientId
          );

          viewForm.toggleForm();
          viewForm.formEl.name.value = client.name;
          viewForm.formEl.email.value = client.email;
          viewForm.formEl.phone.value = client.phone;
          viewForm.formEl.company.value = client.company;
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
          controlEditClient,
     ]);

     await state.createDB();
     state.allClients = await state.getAllClients();
     viewClients.renderClientsList(state.allClients);
};

init();
