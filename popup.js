document.getElementById('getWeather').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    showError("Geolocation is not supported by this browser.");
  }
});

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      const temp = data.main.temp;
      const condition = data.weather[0].main;
      document.getElementById('weatherResult').innerHTML = 
        `<p><strong>${city}</strong></p>
         <p>${temp} °C</p>
         <p>${condition}</p>`;
    })
    .catch(() => showError("Failed to fetch weather data."));
}

function error(err) {
  showError("Location access denied or unavailable.");
}

function showError(message) {
  document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${message}</p>`;
}