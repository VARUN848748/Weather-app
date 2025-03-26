async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "f48950a920db495691a141702240711";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
        document.getElementById("date").innerText = new Date().toDateString();
        document.getElementById("temperature").innerText = `${data.current.temp_c}°C`;
        document.getElementById("condition").innerText = data.current.condition.text;
        
        let forecastHTML = '';
        data.forecast.forecastday.forEach(day => {
            forecastHTML += `
                <div class="forecast-item">
                    <p>${day.date}</p>
                    <p>🌡️ ${day.day.avgtemp_c}°C</p>
                    <p>🌥️ ${day.day.condition.text}</p>
                </div>`;
        });
        document.getElementById("forecast").innerHTML = forecastHTML;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please check the city name.");
    }
}

