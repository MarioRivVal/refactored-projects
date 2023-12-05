const containerEl = document.querySelector(".container");
const loaderEl = document.querySelector(".loader");

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

const iconEl = document.getElementById("icon");

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
          icon,
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

     // const icon = description.replace(" ", "-");
     console.log(icon); // CONSOLE
     //  selectIcon(icon);
};
