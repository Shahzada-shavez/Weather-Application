const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your key

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const weatherCondition = data.weather[0].main;
        updateBackground(weatherCondition);
      })
      .catch(error => console.error('Weather fetch error:', error));
  },
  (error) => {
    console.error('Geolocation error:', error);
  }
);
const API_KEY = "196c23352824f676b941f86d91fc3cf7";

async function weather() {
    const cityInput = document.getElementById("search");
    const cityName = cityInput.value.trim();
    const loadingEl = document.getElementById("loading");

    if (!cityName) {
        showAlert("Please enter a city name");
        return;
    }

    toggleLoading(true);

    try {
        const weatherData = await getWeatherData(cityName);
        renderWeather(weatherData);
    } catch (error) {
        showAlert(error.message || "Something went wrong");
    } finally {
        toggleLoading(false);
    }
}

async function getWeatherData(city) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(endpoint);

    if (!res.ok) throw new Error("City not found");

    return res.json();
}

function renderWeather(data) {
    document.getElementById("city").textContent = data.name || "N/A";
    document.getElementById("temp").textContent = `${data.main?.temp ?? "N/A"}°C`;
    document.getElementById("humid").textContent = `${data.main?.humidity ?? "N/A"}%`;
    document.getElementById("wind").textContent = `${data.wind?.speed ?? "N/A"} m/s`;
    document.getElementById("clouds").textContent = data.clouds?.all ?? "--";
    document.getElementById("rain").textContent = `${data.rain?.["1h"] ?? 0} mm`;

    const iconCode = data.weather?.[0]?.icon || "01d";
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function toggleLoading(state) {
    document.getElementById("loading").style.display = state ? "block" : "none";
}

function showAlert(message) {
    alert(message); // Replace this with a custom modal or toast if desired
}
