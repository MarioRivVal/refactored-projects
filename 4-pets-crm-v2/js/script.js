"use strict";
/////////////////////////////////////
// SECTION ELEMENTS AND CONST

const formContainer = document.querySelector(".form");
const appointContainer = document.querySelector(".box_appointments");
const petContainer = document.querySelector(".box-pet");

const nameInput = document.querySelector("#name-input");
const speciesInput = document.querySelector("#species-input");
const ownerInput = document.querySelector("#owner-input");
const telephoneInput = document.querySelector("#telephone-input");
const dateInput = document.querySelector("#date-input");
const symptomsInput = document.querySelector("#symptoms-input");

const appointObj = {
     name: "",
     species: "",
     owner: "",
     telephone: "",
     date: "",
     symptoms: "",
};
let editMode = false;

/////////////////////////////////////
// SECTION FUNCTIONS

const fillUpAppointObj = function (e) {
     appointObj[e.target.name] = e.target.value;
};

////////////////
const newAppoint = function (e) {
     e.preventDefault();

     if (Object.values(appointObj).includes("")) {
          if (!document.querySelector(".text-alert")) {
               console.log("no existe");
               ui.displayMessage("all fields are required");
          }
          return;
     }

     if (editMode) {
          ui.displayMessage("appointment edited", "success");

          appointAdm.editAppoint({ ...appointObj });

          editMode = false;

          btnChanging(editMode);
     } else {
          if (!document.querySelector(".text-alert")) {
               ui.displayMessage("Appointment added", "success");
          }
          appointObj.id = Date.now();
          appointAdm.createAppoint({ ...appointObj });
     }

     formContainer.reset();

     ui.displayAllAppoinments(appointAdm.allAppointments);

     clearAppointObject();
};

///////////////
const clearAppointObject = function () {
     appointObj.name = "";
     appointObj.species = "";
     appointObj.owner = "";
     appointObj.telephone = "";
     appointObj.date = "";
     appointObj.symptoms = "";
};

///////////////
const getAction = function (e, act) {
     if (e.target.classList.contains(`appointment_btn-${act}`)) {
          const id = +e.target.closest(".appointment").dataset.id;

          if (act === "delete") {
               appointAdm.deleteAppoint(id);
          } else if (act === "edit") {
               loadEditMode(id);
          }
     }
};

///////////////
const loadEditMode = function (id) {
     editMode = true;

     const objToEdit = appointAdm.allAppointments.filter((el) => el.id === id);

     const { name, species, owner, telephone, date, symptoms } = objToEdit[0];

     appointObj.name = name;
     appointObj.species = species;
     appointObj.owner = owner;
     appointObj.telephone = telephone;
     appointObj.date = date;
     appointObj.symptoms = symptoms;
     appointObj.id = id;

     nameInput.value = name;
     speciesInput.value = species;
     ownerInput.value = owner;
     telephoneInput.value = telephone;
     dateInput.value = date;
     symptomsInput.value = symptoms;

     btnChanging(editMode);

     const formView = formContainer.closest(".box");
     formView.scrollIntoView({ behavior: "smooth" });
};
////////////////
const btnChanging = function (editMode) {
     const btn = formContainer.querySelector('button[type="submit"]');

     btn.textContent = editMode ? "Confirm changes" : "Add new appoinment";
     btn.style.backgroundColor = editMode ? "#d4de70" : "#96e8df";
     btn.style.color = editMode ? "#203738" : "#fbf6f0";
};
/////////////////////////////////////
// SECTION CLASSES

class UI {
     displayMessage(message, type) {
          const messageEl = document.createElement("p");
          messageEl.textContent = message;

          messageEl.classList.add("text-alert");

          type === "success"
               ? messageEl.classList.add("success")
               : messageEl.classList.add("alert");

          petContainer.insertAdjacentElement("afterbegin", messageEl);
          console.log(messageEl);

          setTimeout(() => {
               messageEl.remove();
          }, 3000);
     }

     displayAllAppoinments(allAppointments) {
          appointContainer.innerHTML = "";

          allAppointments.forEach((el) => {
               const { name, species, owner, telephone, date, symptoms, id } =
                    el;

               const html = `<div class="appointment" data-id="${id}">
                    <div class="appointment_details">
                        <h3 class="tertiary-title"> ${name}</h3>

                        <p><span class="u-bold-text">Species:</span> ${species}</p>
                        <p>
                            <span class="u-bold-text">Owner:</span> ${owner}
                        </p>
                        <p>
                            <span class="u-bold-text">Tel:</span>
                            ${telephone}
                        </p>
                        <p>
                            <span class="u-bold-text">Date:</span>
                            ${date}
                        </p>
                        <p>
                            <span class="u-bold-text">Symptoms:</span>
                            ${symptoms}
                        </p>
                    </div>
                    <button
                        class="appointment_btn appointment_btn-edit u-hover-btn"
                    >
                        edit
                    </button>
                    <button
                        class="appointment_btn appointment_btn-delete u-hover-btn"
                    >
                        delete
                    </button>
                </div>`;

               appointContainer.insertAdjacentHTML("afterbegin", html);
          });
     }
}

class Appointment {
     constructor() {
          this.allAppointments = [];
     }

     createAppoint(appointObj) {
          this.allAppointments = [...this.allAppointments, appointObj];
     }

     deleteAppoint(id) {
          const confirm = window.confirm("Are you sure?");
          if (!confirm) return;

          this.allAppointments = this.allAppointments.filter(
               (el) => el.id !== id
          );

          ui.displayAllAppoinments(this.allAppointments);

          if (document.querySelector(".text-alert")) return;
          ui.displayMessage("Appoinment deleted", "error");

          formContainer.reset();
          clearAppointObject();
          editMode = false;
          btnChanging(editMode);
     }

     editAppoint(newAppointObj) {
          this.allAppointments = this.allAppointments.map((el) =>
               el.id === newAppointObj.id ? newAppointObj : el
          );
     }
}

/////////////////////////////////////
// SECTION ISTANCES

const ui = new UI();
const appointAdm = new Appointment();

/////////////////////////////////////
// SECTION EVENTS

const eventListerners = function () {
     appointContainer.addEventListener("click", function (e) {
          getAction(e, "edit");
          getAction(e, "delete");
     });
     formContainer.addEventListener("change", fillUpAppointObj);
     formContainer.addEventListener("submit", newAppoint);
};

eventListerners();
