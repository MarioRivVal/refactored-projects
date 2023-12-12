//-----------------------------------------------//
//-----------------------------------------------//
import helper from "../helpers.js";
import viewForm from "./viewForm.js";
import viewApp from "./viewApp.js";
//-----------------------------------------------//
class ViewInfo {
     constructor() {
          this.infoEl = document.querySelector(".modal-info");
          this.infoBoxEl = document.querySelector(".info");
          this.infoCloseBntEl = document.querySelector(".btn-info-close");
          this.infoDeleteBtnEl = document.querySelector(".btn-info-delete");
     }

     //*****************//
     displayStudentInfo(studentData) {
          const { address, quota, city, dni, name, surname, phone, date, id } =
               studentData;

          this.infoBoxEl.dataset.id = id;

          this.infoBoxEl.innerHTML = "";
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
                    <a class="info-telephone"href="tel:${phone}">${phone}</a>
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

          this.infoBoxEl.insertAdjacentHTML("afterbegin", infoHTML);

          viewApp.removeClientOptions();

          helper.toggleWindow("open", [this.infoEl, viewForm.modalBoxEl]);
          this.addHandlerCloseInfo();
     }

     addHandlerCloseInfo() {
          this.infoCloseBntEl.addEventListener("click", () => {
               helper.toggleWindow("close", [this.infoEl, viewForm.modalBoxEl]);
          });
     }
     //*****************//
     addHandlerDeleteStudent(handler) {
          this.infoDeleteBtnEl.addEventListener("click", handler);
     }
}

export default new ViewInfo();
