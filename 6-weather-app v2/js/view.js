export const containerEl = document.querySelector(".container");
export const loaderEl = document.querySelector(".loader");

const dayEl = document.getElementById("day");
const dateEl = document.getElementById("date");
const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");
const tempEl = document.getElementById("temp");
const detailsEl = document.getElementById("details");
const minTempEl = document.getElementById("temp-min");
const maxTempEl = document.getElementById("temp-max");
const windSpeedEl = document.getElementById("wind-speed");
const humidityEl = document.getElementById("humidity");
const iconEl = document.querySelector("#icon use");

const changeLocationBtn = document.querySelector(".info_extra_btn");
//*************************************//

export const displayWeatherInfo = function (data) {
     const {
          city,
          country,
          currentDate,
          currentDay,
          tempC,
          tempMaxC,
          tempMinC,
          humidity,
          speed,
          description,
          usedIcon,
     } = data;

     dayEl.textContent = currentDay;
     dateEl.textContent = currentDate;
     cityEl.textContent = `${city},`;
     countryEl.textContent = country;

     tempEl.textContent = `${tempC} ºC`;
     detailsEl.textContent = description;
     minTempEl.textContent = `${tempMinC} ºC`;
     maxTempEl.textContent = `${tempMaxC} ºC`;
     windSpeedEl.textContent = `${speed} km/h`;
     humidityEl.textContent = `${humidity} %`;
     iconEl.setAttribute("xlink:href", `svg/symbol-defs.svg#${usedIcon}`);
};
//*************************************//

export const elementMode = function (element, mode) {
     mode === "open"
          ? (element.style.display = "grid")
          : (element.style.display = "none");
};
//*************************************//

export const addHandlerChangeLocation = function (handler) {
     changeLocationBtn.addEventListener("click", () => {
          handler();
     });
};
