import {
     getPosition,
     getCityAndCountry,
     getWeather,
     getDate,
} from "./model.js";
import { displayWeatherInfo } from "./view.js";
import { kelvinToCentigrade } from "./helpers.js";

//*************************************//

export const state = {
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
     currentLocale: navigator.language,
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

     return { tempC, tempMaxC, tempMinC, humidity, speed, description, icon };
};
//*************************************//

const init = async function () {
     try {
          const position = await getPosition();

          const { latitude: lat, longitude: lon } = position.coords;
          const { city, country } = await getCityAndCountry(lat, lon);

          state.displayedData.currentPosition = { city, country };

          const data = await getWeather(state.displayedData.currentPosition);
          state.displayedData.currentDate = getDate(state.currentLocale);
          state.displayedData.currentDay = state.weekDays[new Date().getDay()];

          const { currentPosition, ...otherData } = state.displayedData;
          state.displayedData = {
               ...otherData,
               ...currentPosition,
               ...destructuringData(data),
          };

          displayWeatherInfo(state.displayedData);
          console.log(state.displayedData); // CONSOLE
     } catch (error) {
          console.error(error);
     }
};

//*************************************//

init();
