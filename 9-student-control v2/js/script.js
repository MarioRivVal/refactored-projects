"use strict";

import {
    createDB,
    addClientDB,
    getinfoClient,
    deleteClient,
    editClient,
} from "./indexedDB.js";

let selectedYear, selectedMonths;
let checkboxesEl;

let editMode = false;
let newClientObj = {};
let editedClientObj = {};
let allClients = [];
let elementsToPrint = [];

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();

const quartersMonth = {
    first: ["enero", "febrero", "marzo"],
    second: ["abril", "mayo", "junio"],
    third: ["julio", "agosto", "septiembre"],
    fourth: ["octubre", "noviembre", "diciembre"],
};

//--------------------------------------------//
// SECTION DOM ELEMENTS
//--------------------------------------------//

const yearSelectEl = document.querySelector("#year-select");
const monthSelectEl = document.querySelector("#month-select");

const newClientBtnEl = document.querySelector(".btn-new-client");

export const formEl = document.querySelector(".modal form");
const formNewClientBtnEl = document.querySelector(".form_new-client-btn");
const formCancelBtnEl = document.querySelector(".form_cancel-btn");

const modalBoxEl = document.querySelector(".modal-box");
const modalEl = document.querySelector(".modal");
const allInputsEl = document.querySelectorAll(".form_group input");

const modalPaymentEl = document.querySelector(".modal-payment");
const paymentEl = document.querySelector(".payment");

const infoEl = document.querySelector(".modal-info");
const infoBoxEl = document.querySelector(".info");
const infoCloseBntEl = document.querySelector(".btn-info-close");
const infoDeleteBtnEl = document.querySelector(".btn-info-delete");

export const clientsListEl = document.querySelector(".main_clients-list");

const formMonthsPaymentEl = document.querySelector(".payment_months");
const savePaymentBtnEl = document.querySelector(".payment-btn");
const allCheckboxesPaymentEl = document.querySelectorAll(
    ".payment_checkbox-input"
);

const btnPrintEl = document.querySelector(".btn-print");

//--------------------------------------------//
// SECTION FUNCTIONS
//--------------------------------------------//

const createYearOptions = function () {
    const yearSelect = document.querySelector("#year-select");
    for (let i = 0; i < 10; i++) {
        const option = document.createElement("OPTION");
        option.value = 2023 + i;
        option.textContent = 2023 + i;

        yearSelect.appendChild(option);
    }
};

//--------------------------------------------//

const createDate = function () {
    return new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date());
};

//--------------------------------------------//

const readCurrentYear = function () {
    yearSelectEl.querySelectorAll("option").forEach((opt) => {
        if (opt.value === currentYear) {
            yearSelectEl.value = opt.value;
        }
    });
};

//--------------------------------------------//

const readCurrentMonths = function () {
    monthSelectEl.querySelectorAll("option").forEach((opt) => {
        if (quartersMonth[opt.value].includes(currentMonth)) {
            monthSelectEl.value = opt.value;
        }
    });
};

//--------------------------------------------//

const readYearValue = function () {
    selectedYear = yearSelectEl.value;
    displayClientRow(allClients);
};

//--------------------------------------------//

const readMonthsValue = function () {
    selectedMonths = quartersMonth[monthSelectEl.value];
    displayClientRow(allClients);
};

//--------------------------------------------//

export const openCloseModal = function (mode) {
    formNewClientBtnEl.textContent = !editMode ? "agregar" : "editar";

    if (mode === "open") {
        modalBoxEl.classList.add("modal-box-open");
        modalEl.classList.add("modal-open");

        infoEl.classList.remove("open");
    } else {
        modalBoxEl.classList.remove("modal-box-open");
        modalEl.classList.remove("modal-open");

        formEl.reset();
        editMode = false;
    }

    const popupClient = document.querySelector(".popup-options-client");
    if (popupClient) popupClient.remove();
};

//--------------------------------------------//

const createNewClient = function () {
    const emptyInput = Array.from(allInputsEl).some((el) => el.value === "");

    if (emptyInput) {
        displayMessage("Todos los datos son necesarios", "alert");
        return;
    }

    if (!editMode) {
        newClientObj.id = Date.now();
        newClientObj.years = {};
        newClientObj.date = createDate();

        allInputsEl.forEach((el) => {
            newClientObj[el.dataset.key] = el.value;
        });

        addClientDB(newClientObj);
        newClientObj = {};
    } else {
        allInputsEl.forEach((el) => {
            editedClientObj[el.dataset.key] = el.value;
        });

        editClient(editedClientObj);
        editMode = false;
    }

    openCloseModal("close");
    formEl.reset();
};

//--------------------------------------------//

export const displayClientRow = function (dataClients) {
    allClients = dataClients;
    elementsToPrint = [];

    clientsListEl.innerHTML = "";

    dataClients.forEach((client) => {
        const { name, surname, id } = client;

        const clientRowHTML = `
         <div class="client" data-id = "${id}">
        <div class="checkboxes"></div>
        <div class="client_name">
            <p>${name} ${surname}</p>
            <div class="client_buttons">
                <button class="btn client-btn">ver</button>
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
        clientsListEl.insertAdjacentHTML("afterbegin", clientRowHTML);
        checkboxesEl = document.querySelector(".checkboxes");
        createCheckBoxesClient(id);
    });

    document.querySelectorAll(".client_buttons").forEach((el) => {
        el.addEventListener("click", OptionsClient);
    });

    document.querySelectorAll(".print_checkbox-input").forEach((input) => {
        input.addEventListener("click", selectItemsToPrint);
    });
};

//--------------------------------------------//

const createCheckBoxesClient = function (idClient) {
    let year = selectedYear;
    let yearArray;

    allClients.forEach((client) => {
        if (!client.years[year]) return;

        if (client.id === idClient) {
            yearArray = Object.entries(client.years[year]);
        }
    });

    for (let i = 0; i < 3; i++) {
        let n = i + 1;

        const divEl = document.createElement("DIV");
        divEl.classList.add("checkbox-group");

        const inputEl = document.createElement("INPUT");
        inputEl.type = "checkbox";
        inputEl.id = `checkbox${idClient}-${n}`;
        inputEl.classList.add("client_checkbox-input");
        inputEl.dataset.year = selectedYear;
        inputEl.dataset.month = selectedMonths[i];
        inputEl.disabled = true;

        const labelEl = document.createElement("LABEL");
        labelEl.htmlFor = `checkbox${idClient}-${n}`;
        labelEl.classList.add("checkbox");

        const spanEl = document.createElement("SPAN");
        spanEl.classList.add("checkmark");

        labelEl.appendChild(spanEl);

        divEl.appendChild(inputEl);
        divEl.appendChild(labelEl);

        checkboxesEl.appendChild(divEl);

        if (yearArray) markIfPayed(inputEl, yearArray);
    }
};

//--------------------------------------------//

const markIfPayed = function (input, yearArray) {
    const inputMonth = input.dataset.month;

    yearArray.forEach((el) => {
        let keyMonth = el[0];
        let valueBoolean = el[1];

        if (inputMonth === keyMonth && valueBoolean === true) {
            markInput(input, "active");
        }
    });
};

//--------------------------------------------//

export const displayMessage = function (message, type) {
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
//--------------------------------------------//

const OptionsClient = function (e) {
    const ref = e.target.closest(".client_name");

    const optionExist = ref.querySelector(
        ".client_buttons .popup-options-client"
    );
    if (!optionExist) {
        const idClient = ref.closest(".client").dataset.id;
        const anyOption = document.querySelector(
            ".client_name .client_buttons .popup-options-client"
        );

        if (anyOption) {
            anyOption.remove();
        }

        const optionEl = document.createElement("DIV");
        optionEl.classList.add("popup-options-client");

        const btnInfoEl = document.createElement("BUTTON");
        btnInfoEl.classList.add("btn", "btn-info");
        btnInfoEl.textContent = "info";
        btnInfoEl.onclick = () => {
            getinfoClient(idClient, (dataClient) => {
                displayInfoClient(dataClient);
            });
        };

        const btnPaymentEl = document.createElement("BUTTON");
        btnPaymentEl.classList.add("btn", "btn-payment");
        btnPaymentEl.textContent = "pagos";
        btnPaymentEl.onclick = () => {
            getinfoClient(idClient, (dataClient) => {
                setPayments(dataClient);
            });
        };

        const btnEditEl = document.createElement("BUTTON");
        btnEditEl.classList.add("btn", "btn-edit");
        btnEditEl.textContent = "editar";
        btnEditEl.onclick = () => {
            getinfoClient(idClient, (dataClient) => {
                displayClientEdit(dataClient);
            });
        };

        optionEl.appendChild(btnInfoEl);
        optionEl.appendChild(btnPaymentEl);
        optionEl.appendChild(btnEditEl);

        ref.querySelector(".client_buttons").appendChild(optionEl);
    } else {
        optionExist.remove();
    }
};

//--------------------------------------------//

export const displayInfoClient = function (dataClient) {
    const { address, quota, city, dni, name, surname, telephone, date, id } =
        dataClient;

    infoBoxEl.dataset.id = id;

    infoBoxEl.innerHTML = "";
    const infoHTML = `
   
   <div class="info-group">
                    <p>Nombre:</p>
                    <span class="info-name">${name} </span
                    ><span class="info-surname">${surname}</span>
                </div>
                <div class="info-group">
                    <p>Direccion:</p>
                    <span class="info-address">${address} - </span
                    ><span class="info-city">${city}</span>
                </div>
                <div class="info-group">
                    <p>DNI:</p>
                    <span class="info-dni">${dni}</span>
                </div>
                <div class="info-group">
                    <p>Telefono:</p>
                    <span class="info-telephone">${telephone}</span>
                </div>
                <div class="info-group">
                    <p>Inscripcion:</p>
                    <span class="info-date">${date}</span>
                </div>
                <div class="info-group">
                    <p>Cuota:</p>
                    <span class="info-date">${quota}€</span>
                </div>
             
   
   `;

    infoBoxEl.insertAdjacentHTML("afterbegin", infoHTML);

    InfoClientModal("open");
};

//--------------------------------------------//

export const displayClientEdit = function (dataClient) {
    editedClientObj = dataClient;

    const entriesArr = Object.entries(dataClient);

    entriesArr.forEach((el) => {
        const key = el[0];
        const value = el[1];

        allInputsEl.forEach((input) => {
            if (input.dataset.key === key) {
                input.value = value;
            }
        });
    });

    editMode = true;
    InfoClientModal("close");
    openCloseModal("open");
};

//--------------------------------------------//

export const InfoClientModal = function (mode) {
    const action = mode === "open" ? "add" : "remove";
    infoEl.classList[action]("open");
};
//--------------------------------------------//
const paymentsModal = function (mode) {
    const action = mode === "open" ? "add" : "remove";

    modalPaymentEl.classList[action]("modal-payment-open");
    paymentEl.classList[action]("open");
};
//--------------------------------------------//

export const setPayments = function (dataClient) {
    let year = selectedYear;
    editedClientObj = dataClient;

    const { name, surname, years } = editedClientObj;

    if (!years[year]) {
        editedClientObj = {
            ...editedClientObj,
            years: { ...years, [year]: {} },
        };

        allCheckboxesPaymentEl.forEach((input) => {
            const month = input.id;

            editedClientObj.years[year] = {
                ...editedClientObj.years[year],
                [month]: false,
            };
        });
    } else {
        readPayment(year);
    }

    document.querySelector(
        ".payment_title-box .payment-name"
    ).textContent = `${name} ${surname}`;

    document.querySelector(".payment_title-box .payment-year").textContent =
        selectedYear;

    InfoClientModal("close");
    paymentsModal("open");
};

//--------------------------------------------//

const readPayment = function (year) {
    const monthArr = Object.entries(editedClientObj.years[year]);

    monthArr.forEach((el) => {
        const keyMonth = el[0];
        const valueBoolean = el[1];

        allCheckboxesPaymentEl.forEach((input) => {
            if (valueBoolean === true && keyMonth === input.id) {
                markInput(input, "active");
            }
        });
    });
};

//--------------------------------------------//

const savePayments = function () {
    const allMonth = {};

    allCheckboxesPaymentEl.forEach((input) => {
        if (input.checked) {
            allMonth[input.id] = true;
        } else {
            allMonth[input.id] = false;
        }
    });

    editedClientObj.years[selectedYear] = allMonth;
    editClient(editedClientObj);

    allCheckboxesPaymentEl.forEach((input) => {
        markInput(input, "deactivate");
    });

    formMonthsPaymentEl.reset();
    editedClientObj = {};
    paymentsModal("close");
};

//--------------------------------------------//

const markInput = function (input, action) {
    const checkmark = input.nextElementSibling.querySelector(".checkmark");
    const label = input.nextElementSibling;

    if (action === "active") {
        checkmark.style.display = "block";
        input.checked = true;
        label.classList.add("checkbox-hover-effect");
    } else {
        checkmark.style.display = "none";
        input.checked = false;
        label.classList.remove("checkbox-hover-effect");
    }
};

//--------------------------------------------//

const selectItemsToPrint = function (e) {
    const input = e.target;
    const idClient = +input.closest(".client").dataset.id;

    getinfoClient(idClient, (dataClient) => {
        const allInputs = input
            .closest(".client")
            .querySelectorAll(".client_checkbox-input");

        const paidMonths = Array.from(allInputs)
            .map((input) => {
                if (input.checked) {
                    return input.dataset.month;
                }
            })
            .filter(Boolean);

        if (input.checked) {
            markInput(input, "active");
            addObjToPrint(dataClient, paidMonths);
        } else {
            markInput(input, "deactivate");
            removeObjFromPrint(idClient);
        }
    });
};

//--------------------------------------------//

const addObjToPrint = function (dataClient, paidMonths) {
    elementsToPrint = [
        ...elementsToPrint,
        { ...dataClient, year: selectedYear, paidMonths },
    ];
};

//--------------------------------------------//

const removeObjFromPrint = function (idClient) {
    elementsToPrint = elementsToPrint.filter((el) => el.id !== idClient);
};

//--------------------------------------------//

const loadPrintMode = function () {
    const htmlToPrint = [];

    elementsToPrint.forEach((el) => {
        const { name, surname, city, quota, address, dni, year, paidMonths } =
            el;

        for (let i = 0; i < paidMonths.length; i++) {
            const billHTML = `
            <div class="bill">
                    <div class="paid-month">
                        <p class="month">${paidMonths[i]}</p>
                        <p class="year">${year}</p>
                    </div>
                    <div class="client-info">
                        <div>
                            <h4>Nombre:</h4>
                            <div class="details">
                            <p class="name">${name}</p>
                            <p class="surname">${surname}</p>
                            </div>
                        </div>
                        <div>
                            <h4>DNI:</h4>
                            <p class="dni">${dni}</p>
                        </div>
                        <div>
                            <h4>Direccion:</h4>
                            <div class="details">
                            <p class="address">${address}</p>
                            <p class="city">${city}</p>
                            </div>
                        </div>
                    </div>
                    
                    <p class="paid">Pagado - ${quota}€</p>
                    <div class="footer">
                        <div class="sign-box">
                            <p>firma</p>
                        </div>
                        <div class="date-box">
                            <p class="date">${createDate()}</p>
                            <p>fecha</p>
                        </div>
                    </div>
                </div>

            `;

            htmlToPrint.push(billHTML);
        }
    });

    if (htmlToPrint.length) printBills(htmlToPrint);
};

//--------------------------------------------//

const printBills = function (htmls) {
    const headerContent = `<html><head><title>Print Bills</title><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/><link rel="stylesheet" href="css/style.css" /></head><body><section class="all-bills">${htmls.join(
        ""
    )}</section></body></html>`;

    const printWindow = window.open();
    printWindow.document.write(headerContent);
    printWindow.document.close();

    printWindow.print();
};

//--------------------------------------------//
// SECTION EVENTS
//--------------------------------------------//

yearSelectEl.addEventListener("change", readYearValue);
monthSelectEl.addEventListener("change", readMonthsValue);

formNewClientBtnEl.addEventListener("click", createNewClient);
savePaymentBtnEl.addEventListener("click", savePayments);

btnPrintEl.addEventListener("click", loadPrintMode);

newClientBtnEl.addEventListener("click", () => {
    openCloseModal("open");
});

formCancelBtnEl.addEventListener("click", () => {
    openCloseModal("close");
});

infoCloseBntEl.addEventListener("click", () => {
    InfoClientModal("close");
});

infoDeleteBtnEl.addEventListener("click", () => {
    const idClient = +infoBoxEl.dataset.id;
    deleteClient(idClient);
});

allCheckboxesPaymentEl.forEach((input) => {
    input.addEventListener("click", (e) => {
        const input = e.target;

        if (input.checked) {
            markInput(input, "active");
        } else {
            markInput(input, "deactivate");
        }
    });
});

//--------------------------------------------//
// SECTION INIT
//--------------------------------------------//
createDB();
createYearOptions();
readCurrentYear();
readYearValue();
readCurrentMonths();
readMonthsValue();
