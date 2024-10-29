const search = document.getElementById('search');
const temp = document.getElementById('temp');
const ws = document.getElementById('ws');
const hmdty = document.getElementById('hmdty');
const weatherIcon = document.getElementById('weatherIcon'); // Ensure you have this element

async function getWeatherData() {
    const api_key = "c710b69dfb7eac3fd34c5331705ff7f0";
    const city = search.value.trim(); // Trim the input to remove whitespace
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    if (city === "") { // Check if the input is empty
        resetValues(); // Reset if the input is empty
        return; // Exit the function if there's no input
    }

    try {
        const response = await fetch(URL);
        const weatherData = await response.json();

        if (weatherData.cod === 200) { // Check if the API request was successful
            temp.innerHTML = `${Math.round(weatherData.main.temp)}<sup>o</sup>`;
            ws.textContent = weatherData.wind.speed;
            hmdty.textContent = weatherData.main.humidity;
        } else {
            alert("City not found!");
            resetValues(); // Reset if city is not found
        }
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        resetValues(); // Reset on error
    }
}

// Function to reset values to 0
function resetValues() {
    temp.innerHTML = "0<sup>o</sup>";
    ws.textContent = "0";
    hmdty.textContent = "0";
    weatherIcon.src = "default-image.png"; // Reset to default image
}

// Run the function when the user presses Enter
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeatherData();
    }
});

