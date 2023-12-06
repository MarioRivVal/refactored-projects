import {
     API_LOCATION_URL,
     KEY_LOCATION,
     API_WEATHER_URL,
     KEY_WEATHER,
} from "./config.js";

//*************************************//
export const getPosition = () => {
     return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(resolve, reject);
          } else {
               reject(
                    new Error("Geolocation is not supported by this browser.")
               );
          }
     });
};

//*************************************//

export const getCityAndCountry = async (lat, lon) => {
     const key = `${KEY_LOCATION}`;
     const url = `${API_LOCATION_URL}?q=${lat}+${lon}&key=${key}`;

     const response = await fetch(url);
     const data = await response.json();

     const city = data.results[0].components.city;
     const country = data.results[0].components["ISO_3166-1_alpha-2"];

     return { city, country };
};

//*************************************//

export const getWeather = async function ({ city, country }) {
     const key = `${KEY_WEATHER}`;
     const url = `${API_WEATHER_URL}?q=${city},${country}&appid=${key}`;

     const response = await fetch(url);
     const data = await response.json();

     return data;
};
//*************************************//

export const getDate = function (currentLocale) {
     const options = {
          day: "numeric",
          month: "short",
          year: "numeric",
     };

     return new Intl.DateTimeFormat(currentLocale, options).format(new Date());
};
