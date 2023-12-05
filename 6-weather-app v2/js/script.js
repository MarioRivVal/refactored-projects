"use strict";

// ELEMENTS AND CONST
// const bodyEl = document.querySelector("body");

const containerEl = document.querySelector(".container");
const loaderEl = document.querySelector(".loader");

const dayEl = document.getElementById("day");
const dateEl = document.getElementById("date");
const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");

const tempEl = document.getElementById("temp");
const detailsEl = document.getElementById("details");
const iconEl = document.getElementById("icon");
const minTempEl = document.getElementById("temp-min");
const maxTempEl = document.getElementById("temp-max");
const windSpeedEl = document.getElementById("wind-speed");
const humidityEl = document.getElementById("humidity");

const changeLocationBtn = document.querySelector(".info_extra_btn");
const formEl = document.querySelector(".form");

const citySelectionEl = document.getElementById("selection-city");
const countrySelectionEl = document.getElementById("selection-country");
let submitBtn;

let currentLocale;
let currentPosition;

// FUNCTIONS

const getPosition = () => {
     // BUG agregar aqui el promise o synch await
     if (navigator.geolocation)
          navigator.geolocation.getCurrentPosition((position) => {
               console.log(position); // CONSOLE
               const { latitude: lat, longitude: lon } = position.coords;

               const key = `56dac7bc0bb44b0bb87bd4ee8e798d6a`;

               const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${key}`;

               fetch(url)
                    .then((resp) => resp.json())
                    .then((data) => {
                         console.log(data); // CONSOLE
                         const city = data.results[0].components.city;

                         const country =
                              data.results[0].components["ISO_3166-1_alpha-2"];

                         currentPosition = {
                              city,
                              country,
                         };
                    })
                    .catch((error) => console.log(error));
          });
};

const getWeather = function ({ city, country }) {
     const appID = "113ca1dde57ac049ccc09630bf6787c7";
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;

     fetch(url)
          .then((res) => res.json())
          .then((data) => {
               console.log(data); // CONSOLE

               if (data.cod === "404") {
                    elementMode(loaderEl, "close");
                    displayMessage("city not found");
                    elementMode(containerEl, "open");

                    return;
               }

               elementMode(loaderEl, "close");
               displayWeatherInfo(data);
               elementMode(containerEl, "open");
          });
};

const displayWeatherInfo = function (data) {
     const {
          main: { temp, temp_max, temp_min, humidity },
          wind: { speed },
          weather: [{ description, icon }],
     } = data;

     dayEl.textContent = getDay();
     dateEl.textContent = getDate(currentLocale);
     cityEl.textContent = `${currentPosition.city},`;
     countryEl.textContent = currentPosition.country;
     tempEl.textContent = `${kelvinToCentigrade(temp)} ºC`;
     detailsEl.textContent = description;
     minTempEl.textContent = `${kelvinToCentigrade(temp_min)} ºC`;
     maxTempEl.textContent = `${kelvinToCentigrade(temp_max)} ºC`;
     windSpeedEl.textContent = `${speed} km/h`;
     humidityEl.textContent = `${humidity} %`;

     // const icon = description.replace(" ", "-");
     console.log(icon); // CONSOLE
     selectIcon(icon);
};

const selectIcon = function (icon) {
     let realIcon;
     switch (icon) {
          case "01d":
          case "01n":
               realIcon = "clear-sky";

               break;
          case "02d":
          case "02n":
               realIcon = "few-clouds";

               break;
          case "03d":
          case "03n":
               realIcon = "scattered-clouds";

               break;

          case "04d":
          case "04n":
               realIcon = "broken-clouds";

               break;

          case "09d":
          case "09n":
               realIcon = "shower-rain";

               break;
          case "10d":
          case "10n":
               realIcon = "rain";

               break;
          case "11d":
          case "11n":
               realIcon = "thunderstorm";

               break;
          case "13d":
          case "13n":
               realIcon = "snow";

               break;
          case "50d":
          case "50n":
               realIcon = "mist";

               break;

          default:
               break;
     }

     iconEl.innerHTML = "";
     iconEl.insertAdjacentHTML(
          "afterbegin",
          `  <use
               xlink:href="svg/symbol-defs.svg#${realIcon}"
               ></use>`
     );
};

const getDay = () => {
     const weekDays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thrusday",
          "Friday",
          "Saturday",
     ];
     const currentDay = weekDays[new Date().getDay()];
     return currentDay;
};

const getDate = (currentLocale) => {
     const options = {
          day: "numeric",
          month: "short",
          year: "numeric",
     };

     return new Intl.DateTimeFormat(currentLocale, options).format(new Date());
};

const readValues = function (e) {
     e.preventDefault();
     if (citySelectionEl.value === "" || countrySelectionEl.value === "") {
          displayMessage("All fields are required");
          return;
     }
     console.log(citySelectionEl.value);
     console.log(countrySelectionEl.value);

     currentPosition.city = citySelectionEl.value;
     currentPosition.country = countrySelectionEl.value;
     elementMode(loaderEl, "open");
     getWeather(currentPosition);
     elementMode(formEl, "close");
};

const displayMessage = function (message) {
     const messageDiv = document.querySelector(".message-alert");
     if (!messageDiv) {
          const messageDiv = document.createElement("div");
          messageDiv.classList.add("message-alert");
          messageDiv.textContent = message;
          formEl.insertAdjacentElement("afterend", messageDiv);

          setTimeout(() => {
               messageDiv.remove();
          }, 2000);
     }
};

// HELPERS FUNCTIONS
const kelvinToCentigrade = (temp) => parseInt(temp - 273.15);

const elementMode = function (element, mode) {
     mode === "open"
          ? (element.style.display = "grid")
          : (element.style.display = "none");
};

// EVENTS

document.addEventListener("DOMContentLoaded", () => {
     currentLocale = navigator.language;

     getPosition();

     setTimeout(() => {
          getWeather(currentPosition);
     }, 2000);
});

changeLocationBtn.addEventListener("click", () => {
     elementMode(containerEl, "close");
     elementMode(formEl, "open");

     document.querySelector(".form_btn").addEventListener("click", readValues);
     document.querySelector(".close_btn").addEventListener("click", () => {
          elementMode(formEl, "close");
          elementMode(containerEl, "open");
     });
});
