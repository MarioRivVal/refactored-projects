"use strict";

import { autos } from "./data.js";

//////////////////////////////////////////////
// MODEL

class Model {
     constructor() {
          this.autos = autos;
          this.initShowedCars = [];
          this.filteredCars = [];
          this.filterOptions = {
               brand: "all",
               transmission: "all",
               engine: "all",
          };
     }

     randomNum() {
          return Math.trunc(Math.random() * 20) + 1;
     }
}

//////////////////////////////////////////////
// VIEW

class View {
     _btnFilter = document.querySelector(".container__btn-filter");
     _filterForm = document.querySelector(".filter");
     _container = document.querySelector(".container");
     _cardsContainer = document.querySelector(".container__cards");
     _allSelections = document.querySelectorAll(".selection");
     _btnSearch = document.querySelector(".filter__btn-search");

     renderHTML(number, autos) {
          const HTML = `  
                         <div class="card">
                                <div class="card__name">
                                    <p class="card__brand">${autos[number].brand}</p>
                                    <p class="card__model">${autos[number].model}</p>
                                </div>
        
                                <img
                                    src="${autos[number].url}"
                                    class="card__img"
                                    alt="BMW serie 3"
                                />
                                <div class="card__descript">
                                    <p class="card__descript-engine">${autos[number].engine}</p>
                                    <p class="card__descript-transmission">${autos[number].transmission}</p>
                                    <p class="card__descript-year">${autos[number].year}</p>
                                    <p class="card__descript-price">€${autos[number].price}</p>
                                </div>
                         </div>`;

          this._cardsContainer.insertAdjacentHTML("afterbegin", HTML);
     }

     //-------------------------------//
     handlefilterClick(handler) {
          this._btnFilter.addEventListener("click", handler);
     }

     //-------------------------------//
     handlerSearchClick(handler) {
          this._btnSearch.addEventListener("click", handler);
     }

     //-------------------------------//

     handlerSelectionChange(handler) {
          this._allSelections.forEach((sel) =>
               sel.addEventListener("change", () => {
                    handler(sel);
               })
          );
     }
}

//////////////////////////////////////////////
// CONTROLER

class Controler {
     constructor(model, view) {
          this.model = model;
          this.view = view;
     }

     selectRandomCards() {
          for (let i = 0; i < 6; i++) {
               let card;

               do {
                    card = this.model.randomNum();
               } while (this.model.initShowedCars.includes(card));
               this.model.initShowedCars.push(card);
          }

          this.model.initShowedCars.forEach((number) => {
               this.view.renderHTML(number, this.model.autos);
          });
     }

     //-------------------------------//

     createFilterOptions() {
          this.model.filteredCars = [];
          const filterKeys = Object.keys(this.model.filterOptions);

          this.model.autos.forEach((el, i) => {
               const isMatch = filterKeys.every(
                    (key) =>
                         this.model.filterOptions[key] === "all" ||
                         el[key] === this.model.filterOptions[key]
               );

               if (isMatch) {
                    this.model.filteredCars.push(i);
               }
          });

          this.runFilter();
     }
     //-------------------------------//

     runFilter() {
          this.view._cardsContainer.innerHTML = "";
          this.checkNoResultsMessage();

          this.model.filteredCars.forEach((number) => {
               this.view.renderHTML(number, this.model.autos);
          });

          this.controlFilterBtnClick();
     }
     //-------------------------------//

     checkNoResultsMessage() {
          const errorMessageElement =
               document.querySelector(".no-results-active");
          const hasResults = this.model.filteredCars.length > 0;

          if (errorMessageElement) {
               if (hasResults) {
                    this.view._container.removeChild(errorMessageElement);
               }
          } else if (!hasResults) {
               const newErrorMessageElement = document.createElement("P");
               newErrorMessageElement.classList.add("no-results-active");
               newErrorMessageElement.textContent = "No results";
               this.view._container.appendChild(newErrorMessageElement);
          }
     }
     //-------------------------------//
     controlFilterBtnClick() {
          this.view._filterForm.classList.toggle("filter-hidden");
          this.view._filterForm.classList.toggle("filter-active");
     }
     //-------------------------------//

     controlSearchClick(e) {
          e.preventDefault();
          this.createFilterOptions();
     }
     //-------------------------------//
     controlSelectionChange(select) {
          const selection = select.value;

          if (this.model.filterOptions[select.id] === selection) return;

          this.model.filterOptions[select.id] = selection;
     }
}

//////////////////////////////////////////////
// INIT

const init = function () {
     const model = new Model();
     const view = new View();
     const controller = new Controler(model, view);
     controller.selectRandomCards();
     view.handlefilterClick(controller.controlFilterBtnClick.bind(controller));
     view.handlerSearchClick(controller.controlSearchClick.bind(controller));
     view.handlerSelectionChange(
          controller.controlSelectionChange.bind(controller)
     );
};
document.addEventListener("DOMContentLoaded", init);
