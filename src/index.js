//update time
function formatDate(date) {
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = weekday[now.getDay()];

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}
formatDate();
// change city
// function cityRun(event) {
//   event.preventDefault();
//   let searchCity = document.querySelector("#search-your-city");
//   let newCity = document.querySelector("#new-city");
//   if (searchCity.value) {
//     newCity.innerHTML = `${searchCity.value}`;
//   } else {
//     newCity.innerHTML = null;
//     alert("Please enter your city");
//   }
// }
// let city = document.querySelector("#enterCity");
// city.addEventListener("submit", cityRun);

//Bonus
function fahrenheitDegrees(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temprature");
  let fahTemp = Math.round((fahrenheit.innerHTML * 9) / 5 + 32);
  fahrenheit.innerHTML = `${fahTemp}`;
}
let fahrenheitButton = document.querySelector("#buttonF");
fahrenheitButton.addEventListener("click", fahrenheitDegrees);

function celciusDegrees(event) {
  event.preventDefault();
  let celcius = document.querySelector("#current-temprature");
  let celTemp = Math.round(((celcius.innerHTML - 32) * 5) / 9);
  console.log(celTemp);
  celcius.innerHTML = `${celTemp}`;
}
let celciusButton = document.querySelector("#buttonC");
celciusButton.addEventListener("click", celciusDegrees);
////////
function displayWeather(response) {
  console.log(response.data.main.temp);

  let enterCity = document.querySelector("#new-city");
  let enterWeather = document.querySelector("#current-temperature");
  enterCity.innerHTML = response.data.name;
  enterWeather.innerHTML = Math.round(response.data.main.temp);
}
function searchCity(city) {
  let apiKey = "ff3fd882f52fb1c27e72af3c00822426";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-your-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiKey = "ff3fd882f52fb1c27e72af3c00822426";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#enterCity");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Denver");
