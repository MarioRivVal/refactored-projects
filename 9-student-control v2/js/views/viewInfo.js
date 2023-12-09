//-----------------------------------------------//
//-----------------------------------------------//
import helper from "../helpers.js";
//-----------------------------------------------//
class ViewInfo {
     constructor() {
          this.infoBoxEl = document.querySelector(".info");
     }

     //*****************//
     displayStudentInfo(studentDta) {
          const { address, quota, city, dni, name, surname, phone, date, id } =
               studentDta;

          // infoBoxEl.dataset.id = id;

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
          console.log(this.infoBoxEl); //CONSOLE

          helper.toggleWindow("open", [this.infoBoxEl]);
     }
}

export default new ViewInfo();
