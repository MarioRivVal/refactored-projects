"use strict";

import { autos } from "./data.js";

//////////////////////////////////////////////
// MODEL

class Model {
     constructor() {
          this.autos = autos;
          this.initShowedCards = [];
          this.filteredCards = [];
          this.filterOptions = {
               brand: "",
               transmisson: "",
               engine: "",
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
          return `  <div class="card">
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
     }

     //-------------------------------//
     handlefilterClick(handler) {
          this._btnFilter.addEventListener("click", handler);
     }

     //-------------------------------//
     handlerSearchClick(handler) {
          this._btnSearch.addEventListener("click", handler);
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
               } while (this.model.initShowedCards.includes(card));
               this.model.initShowedCards.push(card);
          }

          this.model.initShowedCards.forEach(
               (number) =>
                    (this.view._cardsContainer.innerHTML +=
                         this.view.renderHTML(number, this.model.autos))
          );
     }

     //-------------------------------//

     // FIX
     controlFilterFormClick() {
          const state = this.view._filterForm;

          if (state.style.display === "none") console.log("yes");

          //   this.view._filterForm.classList.toggle("filter-active");
     }
     //-------------------------------//

     controlSearchClick(e) {
          e.preventDefault();
          this.controlFilterFormClick();
          console.log("click");
     }
}

//////////////////////////////////////////////
// INIT

const init = function () {
     const model = new Model();
     const view = new View();
     const controller = new Controler(model, view);
     controller.selectRandomCards();
     view.handlefilterClick(controller.controlFilterFormClick.bind(controller));
     view.handlerSearchClick(controller.controlSearchClick.bind(controller));
};
document.addEventListener("DOMContentLoaded", init);

//     /////////////////
//     // DOM' S ELEMENTS

//     const btnFilter = document.querySelector(".container__btn-filter");
//     const filterForm = document.querySelector(".filter");
//     const container = document.querySelector(".container");
//     const cardsContainer = document.querySelector(".container__cards");

//     const allSelections = document.querySelectorAll(".selection");

//     const btnSearch = document.querySelector(".filter__btn-search");

//     ////////////
//     // FUNTIONS

//     const noResults = function () {
//         let errorMessage = document.querySelector(".no-results-active");
//         if (!errorMessage && filteredCards.length === 0) {
//             const errorMessage = document.createElement("P");
//             errorMessage.classList.add("no-results-active");
//             errorMessage.textContent = "no results";
//             container.appendChild(errorMessage);
//             return;
//         }
//         if (errorMessage && filteredCards.length > 0)
//             container.removeChild(errorMessage);
//     };

//     const createFilterOptions = function () {
//         filteredCards = [];
//         autos.forEach((el, i) => {
//             if (
//                 (filterOptions.brand === "" ||
//                     el.brand === filterOptions.brand) &&
//                 (filterOptions.transmission === "" ||
//                     el.transmission === filterOptions.transmission) &&
//                 (filterOptions.engine === "" ||
//                     el.engine === filterOptions.engine)
//             ) {
//                 filteredCards.push(i);
//             }
//         });
//     };

//     const runFilter = function (e) {
//         e.preventDefault();

//         noResults();

//         cardsContainer.innerHTML = "";
//         filteredCards.forEach((n) => {
//             cardsContainer.innerHTML += generateHtml(n);
//         });

//         filterForm.classList.remove("filter-active");
//         filterForm.classList.add("filter-hidden");
//     };

//     /////////////////
//     // EVENTS

//     btnFilter.addEventListener("click", function () {
//         createFilterOptions();

//         filterForm.classList.toggle("filter-hidden");
//         filterForm.classList.toggle("filter-active");
//     });

//     document.addEventListener("click", function (e) {
//         if (!btnFilter.contains(e.target) && !filterForm.contains(e.target)) {
//             filterForm.classList.remove("filter-active");
//             filterForm.classList.add("filter-hidden");
//         }
//     });

//     allSelections.forEach((sel) => {
//         sel.addEventListener("change", function () {
//             const selection = sel.value;

//             if (filterOptions[sel.id] === selection) return;

//             filterOptions[sel.id] = selection;

//             createFilterOptions();
//         });
//     });

//     btnSearch.addEventListener("click", runFilter);
// });
