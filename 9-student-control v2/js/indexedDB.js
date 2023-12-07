"use strict";
import {
    displayClientRow,
    displayMessage,
    clientsListEl,
    InfoClientModal,
    formEl,
    openCloseModal,
} from "./script.js";

let db;

//--------------------------------------------//
// SECTION CREATE DATABASE
//--------------------------------------------//
export const createDB = function () {
    const request = window.indexedDB.open("lista estudiantes", 1);

    request.onerror = () => {
        console.log("error al crear la base de datos");
    };

    request.onupgradeneeded = (e) => {
        console.log("db creada");
        db = e.target.result;

        const objectStore = db.createObjectStore("estudiantes", {
            keyPath: "id",
            autoIncrement: true,
        });

        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("surname", "surname", { unique: false });

        objectStore.createIndex("dni", "dni", { unique: true });
        objectStore.createIndex("id", "id", { unique: true });
    };

    request.onsuccess = () => {
        db = request.result;
        getAllDataDB();
    };
};

//--------------------------------------------//
// SECTION ADD CLIENT IN DATABASE
//--------------------------------------------//

export const addClientDB = function (newClientObj) {
    const transaction = db.transaction("estudiantes", "readwrite");
    const objectStore = transaction.objectStore("estudiantes");

    const addRequest = objectStore.add(newClientObj);

    addRequest.onsuccess = () => {
        getAllDataDB();
        displayMessage("Agregado", "confirm");
    };

    addRequest.onerror = (e) => {
        console.log(e.target.error);
        displayMessage("Este DNI ya existe", "alert");
    };
};

//--------------------------------------------//
// SECTION GET DATA FROM  DATABASE
//--------------------------------------------//

export const getAllDataDB = function () {
    const objectStore = db
        .transaction("estudiantes")
        .objectStore("estudiantes");

    objectStore.getAll().onsuccess = (e) => {
        const data = e.target.result;
        displayClientRow(data);
    };
};

//--------------------------------------------//
// SECTION GET INFO SINGLE CLIENT
//--------------------------------------------//

export const getinfoClient = function (idClient, callbackF) {
    const objectStore = db
        .transaction("estudiantes", "readwrite")
        .objectStore("estudiantes");

    objectStore.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;

        if (cursor) {
            if (cursor.value.id === +idClient) {
                callbackF(cursor.value);
            } else {
                cursor.continue();
            }
        } else {
            callbackF(null);
        }
    };
};

//--------------------------------------------//
// SECTION DELETE CLIENT
//--------------------------------------------//

export const deleteClient = function (idClient) {
    const transaction = db.transaction("estudiantes", "readwrite");

    const objectStore = transaction.objectStore("estudiantes");

    objectStore.delete(idClient);

    transaction.oncomplete = () => {
        getAllDataDB();
        displayMessage("Eliminado", "alert");
        InfoClientModal("close");
    };
};

//--------------------------------------------//
// SECTION EDIT CLIENT
//--------------------------------------------//

export const editClient = function (client) {
    const transaction = db.transaction("estudiantes", "readwrite");
    const objectStore = transaction.objectStore("estudiantes");

    objectStore.put(client);

    transaction.oncomplete = () => {
        displayMessage("Editado", "confirm");
        formEl.reset();
        openCloseModal("close");
        clientsListEl.innerHTML = "";

        getAllDataDB();
    };
};
