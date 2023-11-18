"use strict";

document.addEventListener("DOMContentLoaded", function () {
     ///////////////////////////////////////////
     // ElEMENTS

     const emailContent = {
          email: "",
          subject: "",
          textarea: "",
     };

     const formContainer = document.getElementById("form");

     const emailInput = document.querySelector("#email");
     const subjectInput = document.querySelector("#subject");
     const textareaInput = document.querySelector("#textarea");

     const spinner = document.querySelector(".spinner");
     const check = document.querySelector(".check");

     const btnSubmit = document.querySelector(".btn-submit");
     const btnReset = document.querySelector(".btn-reset");

     ///////////////////////////////////////////
     // FUNTIONS

     const resetForm = function () {
          emailContent.email = "";
          emailContent.subject = "";
          emailContent.textarea = "";

          formContainer.reset();
          checkEmailContent();
     };

     //----------------------------//
     const sendEmail = function (e) {
          e.preventDefault();
          spinner.style.display = "grid";

          setTimeout(() => {
               spinner.style.display = "none";

               check.style.display = "grid";

               setTimeout(() => {
                    check.style.display = "none";
                    resetForm();
               }, 3000);
          }, 3000);
     };

     //----------------------------//
     const checkEmailContent = function () {
          if (Object.values(emailContent).includes("")) {
               toggleSubmitBtn("desabled");
               return;
          }
          toggleSubmitBtn("enabled");
     };

     //----------------------------//

     const toggleSubmitBtn = function (mode) {
          if (mode === "desabled") {
               btnSubmit.classList.add("btn-submit--disabled");
               btnSubmit.disabled = true;
          } else {
               btnSubmit.classList.remove("btn-submit--disabled");
               btnSubmit.disabled = false;
          }
     };

     //----------------------------//
     const checkEmail = function (email) {
          const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
          const testedEmail = regex.test(email);
          return testedEmail;
     };

     //----------------------------//
     const removeAlert = function (parentReference) {
          const alert = parentReference.querySelector(".alert-message");

          if (alert) alert.remove();
     };

     //----------------------------//
     const displayAlert = function (message, parentReference) {
          removeAlert(parentReference);

          const alert = parentReference.querySelector(".alert-message");

          if (!alert) {
               const alert = document.createElement("P");
               alert.textContent = message;
               alert.classList.add("alert-message");

               parentReference.appendChild(alert);
          }
     };

     //----------------------------//
     const checkInputs = function (e) {
          if (e.target.value.trim() === "") {
               displayAlert(
                    `The ${e.target.id} field is required`,
                    e.target.parentElement
               );

               checkEmailContent();
               return;
          }

          if (!checkEmail(e.target.value) && e.target.id === "email") {
               displayAlert("The email is invalid", e.target.parentElement);

               toggleSubmitBtn("desabled");
               return;
          }

          removeAlert(e.target.parentElement);

          // Adding email content
          emailContent[e.target.id] = e.target.value.toLowerCase().trim();

          checkEmailContent();
          console.log(emailContent); // CONSOLE
     };

     ///////////////////////////////////////////
     // EVENT LISTENERS

     [emailInput, subjectInput, textareaInput].forEach((el) => {
          el.addEventListener("input", checkInputs);
     });

     btnSubmit.addEventListener("click", sendEmail);

     btnReset.addEventListener("click", function (e) {
          e.preventDefault();
          resetForm();
     });
});
