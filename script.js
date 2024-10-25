document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('cityInput');
  const searchForm = document.getElementById('searchForm');
  const weatherInfo = document.getElementById('weatherInfo');
  const mapContainer = document.getElementById('map');

  // Initialize Leaflet map
  const map = L.map(mapContainer).setView([20, 0], 2); // Center on Africa with low zoom

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Click event on the map
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    generateRandomWeather(lat, lng);
  });

  // Form submission to search weather by city
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city) {
      generateRandomWeatherByCity(city);
    }
  });

  // Generate random weather data by city name
  function generateRandomWeatherByCity(city) {
    const fakeWeatherData = generateFakeWeatherData();
    updateWeatherInfo({ name: city, ...fakeWeatherData });
    updateBackground(fakeWeatherData.condition.toLowerCase());
  }

  // Generate random weather data by coordinates
  function generateRandomWeather(lat, lng) {
    const fakeWeatherData = generateFakeWeatherData();
    updateWeatherInfo({ name: `Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`, ...fakeWeatherData });
    updateBackground(fakeWeatherData.condition.toLowerCase());
  }

  // Generate fake weather data
  function generateFakeWeatherData() {
    const conditions = ['Clear', 'Rain', 'Snow', 'Clouds', 'Sunny', 'Thunderstorm', 'Drizzle', 'Mist'];
    const icons = ['01d', '09d', '13d', '04d', '01d', '11d', '10d', '50d'];

    const randomIndex = Math.floor(Math.random() * conditions.length);
    const temperature = (Math.random() * 30 + 10).toFixed(1); // Random temp between 10 and 40°C
    const humidity = Math.floor(Math.random() * 100); // Random humidity 0-100%
    const windSpeed = (Math.random() * 10).toFixed(2); // Random wind speed 0-10 m/s

    return {
      condition: conditions[randomIndex],
      temperature,
      humidity,
      windSpeed,
      icon: icons[randomIndex],
    };
  }

  // Update weather information in the DOM
  function updateWeatherInfo(data) {
    weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.temperature}°C</p>
      <p>Condition: ${data.condition}</p>
      <p>Humidity: ${data.humidity}%</p>
      <p>Wind Speed: ${data.windSpeed} m/s</p>
      <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.condition}">
    `;
  }

  // Update the background based on weather conditions with GIFs
  function updateBackground(condition) {
    document.body.className = ''; // Reset background
    if (condition.includes('clear') || condition === 'sunny') {
      document.body.classList.add('summer');
    } else if (condition.includes('rain') || condition === 'drizzle' || condition.includes('thunderstorm')) {
      document.body.classList.add('rain');
    } else if (condition.includes('snow')) {
      document.body.classList.add('winter');
    } else if (condition.includes('clouds') || condition.includes('fog') || condition.includes('mist')) {
      document.body.classList.add('monsoon');
    } else {
      document.body.style.background = '#e0f7fa'; // Default background
    }
  }
});
