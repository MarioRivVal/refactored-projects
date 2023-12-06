import {
     getPosition,
     getCityAndCountry,
     getWeather,
     getDate,
} from "./model.js";

import {
     displayWeatherInfo,
     elementMode,
     containerEl,
     loaderEl,
     addHandlerChangeLocation,
} from "./view.js";

import {
     formEl,
     addHandlerCloseForm,
     addHandlerSubmitForm,
     createCountryOptions,
     displayAlert,
} from "./viewForm.js";

import { kelvinToCentigrade } from "./helpers.js";

//*************************************//

export const state = {
     currentLocale: navigator.language,

     displayedData: {
          currentPosition: {},
          currentDate: "",
          currentDay: "",
     },

     weekDays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
     ],

     iconMap: {
          "01d": "clear-sky",
          "01n": "clear-sky",
          "02d": "few-clouds",
          "02n": "few-clouds",
          "03d": "scattered-clouds",
          "03n": "scattered-clouds",
          "04d": "broken-clouds",
          "04n": "broken-clouds",
          "09d": "shower-rain",
          "09n": "shower-rain",
          "10d": "rain",
          "10n": "rain",
          "11d": "thunderstorm",
          "11n": "thunderstorm",
          "13d": "snow",
          "13n": "snow",
          "50d": "mist",
          "50n": "mist",
     },

     countries: [
          { name: "United States", code: "US" },
          { name: "United Kingdom", code: "GB" },
          { name: "Spain", code: "ES" },
          { name: "France", code: "FR" },
          { name: "Italy", code: "IT" },
          { name: "Germany", code: "DE" },
          { name: "Greece", code: "GR" },
          { name: "Portugal", code: "PT" },
          { name: "Sweden", code: "SE" },
          { name: "Finland", code: "FI" },
          { name: "Norway", code: "NO" },
          { name: "Denmark", code: "DK" },
          { name: "Poland", code: "PL" },
          { name: "Bulgaria", code: "BG" },
          { name: "Czech Republic", code: "CZ" },
          { name: "Estonia", code: "EE" },
          { name: "Netherlands", code: "NL" },
          { name: "Belgium", code: "BE" },
          { name: "Switzerland", code: "CH" },
          { name: "Austria", code: "AT" },
          { name: "Ireland", code: "IE" },
          { name: "Croatia", code: "HR" },
          { name: "Turkey", code: "TR" },
          { name: "Iceland", code: "IS" },
          { name: "Luxembourg", code: "LU" },
          { name: "Australia", code: "AU" },
          { name: "Canada", code: "CA" },
          { name: "Mexico", code: "MX" },
          { name: "Brazil", code: "BR" },
          { name: "Argentina", code: "AR" },
          { name: "Colombia", code: "CO" },
          { name: "Venezuela", code: "VE" },
          { name: "Ecuador", code: "EC" },
     ],
};
//*************************************//

const destructuringData = function (data) {
     const {
          main: { temp, temp_max, temp_min, humidity },
          wind: { speed },
          weather: [{ description, icon }],
     } = data;

     const tempC = kelvinToCentigrade(temp);
     const tempMaxC = kelvinToCentigrade(temp_max);
     const tempMinC = kelvinToCentigrade(temp_min);
     const usedIcon = selectIcon(icon);

     return {
          tempC,
          tempMaxC,
          tempMinC,
          humidity,
          speed,
          description,
          usedIcon,
     };
};
//*************************************//

const selectIcon = function (icon) {
     return state.iconMap[icon];
};

//*************************************//

const controlChangeLocation = function () {
     elementMode(containerEl, "close");
     elementMode(formEl, "open");
};
//*************************************//
const controlCloseForm = function () {
     elementMode(containerEl, "open");
     elementMode(formEl, "close");
};
//*************************************//

const controlSubmitForm = async function (e) {
     e.preventDefault();

     if (checkEmptyInput()) {
          displayAlert("All fields are required");
          return;
     }

     const formData = getFormData();

     formEl.reset();
     elementMode(formEl, "close");
     elementMode(containerEl, "close");
     elementMode(loaderEl, "open");

     try {
          await loadAllData({ ...formData });
     } catch (error) {
          console.error(error);
     }
};
//*************************************//

export const checkEmptyInput = function () {
     const inputs = [...formEl.elements];
     const emptyInputs = inputs.filter(
          (input) => input.value === "" && input.type !== "submit"
     );
     return emptyInputs.length > 0;
};
//*************************************//

export const getFormData = function () {
     const formData = new FormData(formEl);
     const objFormData = Object.fromEntries(formData);
     return objFormData;
};
//*************************************//

const loadAllData = async function (data) {
     state.displayedData.currentPosition = { ...data };

     try {
          const data = await getWeather(state.displayedData.currentPosition);

          if (data.cod === "404") {
               elementMode(loaderEl, "close");
               elementMode(containerEl, "close");

               elementMode(formEl, "open");
               displayAlert("city not found");

               return;
          }

          state.displayedData.currentDate = getDate(state.currentLocale);
          state.displayedData.currentDay = state.weekDays[new Date().getDay()];

          const { currentPosition, ...otherData } = state.displayedData;
          state.displayedData = {
               ...otherData,
               ...currentPosition,
               ...destructuringData(data),
          };

          displayWeatherInfo(state.displayedData);

          elementMode(loaderEl, "close");
          elementMode(containerEl, "open");
     } catch (error) {
          console.error(error);
     }
};
//*************************************//

const init = async function () {
     elementMode(loaderEl, "open");
     createCountryOptions(state.countries);

     addHandlerChangeLocation(controlChangeLocation);
     addHandlerCloseForm(controlCloseForm);
     addHandlerSubmitForm(controlSubmitForm);

     try {
          const position = await getPosition();

          const { latitude: lat, longitude: lon } = position.coords;
          const { city, country } = await getCityAndCountry(lat, lon);

          await loadAllData({ city, country });
     } catch (error) {
          console.error(error);
     }
};

//*************************************//

init();
