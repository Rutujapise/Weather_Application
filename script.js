const resultElmt = document.querySelector('#result');
const cityNameElmt = document.querySelector('#cityName');

async function fetchWeather(city) {
  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ca018df54353f065aaed7d802825b8be`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "city not found") {
        resultElmt.innerHTML = `<div class="alert alert-danger mt-3">❌ City not found. Please try another one.</div>`;
      } else {
        displayWeather(data);
      }
    })
    .catch((err) => console.log(err));
}

function displayWeather(data) {
  resultElmt.innerHTML = `
    <div class="weather-card text-center mx-auto w-50 mt-5">
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
      <h5 class="text-capitalize text-muted">${data.weather[0].description}</h5>
      <p>🌡 Temperature: <strong>${data.main.temp}°C</strong></p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    </div>
  `;
}

async function handleSubmit() {
  const city = cityNameElmt.value.trim();
  if (city === '') {
    resultElmt.innerHTML = `<div class="alert alert-warning mt-3">⚠️ Please enter a city name.</div>`;
    return;
  }
  await fetchWeather(city);
}