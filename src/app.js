function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temperature-icon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;

  getForecast(response.data.city);
}
function formatDate(date) {
  let minute = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}
function searchCity(city) {
  let apiKey = "a25680cd3bfede3ffb2o46193b1cd5tb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeatherData);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "a25680cd3bfede3ffb2o46193b1cd5tb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-day">
<div class="forecast-date">${formatDay(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }" class="img-fluid forecast-icon" />
            <div class="forecast-temperatures">
              <span class="forecast-temperature-high">
              <strong>${Math.round(day.temperature.maximum)}°
              </strong>
              </span> 
              <span class="forecast-temperature-low">${Math.round(
                day.temperature.minimum
              )}°
              </span>
            </div>
          </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Tokyo");

function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
}
let changeThemeButton = document.querySelector(".change-theme-button");
changeThemeButton.addEventListener("click", changeTheme);
