import { useState } from "react";
import "./App.css";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Skeleton from "react-loading-skeleton";
import { Oval } from "react-loader-spinner";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<{
    loading: boolean;
    data: WeatherData | null;
    error: boolean;
  }>({
    loading: false,
    data: null,
    error: false,
  });

  const handleSearch = async () => {
    try {
      setWeatherData({ ...weatherData, loading: true });
      const response = await axios.get<WeatherData>(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=733ebae1d93a91a5acbac287d1b5fadb&units=metric`
      );
      setWeatherData({ loading: false, data: response.data, error: false });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setWeatherData({ loading: false, data: null, error: true });
    }
  };

  return (
    <div className="weather-card">
      <div className="row justify-content-end">
        <div className="col-auto">
          <div className="sunny-icon">
            <i className="bi bi-sun-fill"></i>
          </div>
        </div>
      </div>
      <h1 className="weather-title text-center mb-4">Weather App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your City Name"
          aria-label="City Name"
          aria-describedby="basic-addon2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="btn btn-primary weather-btn"
          type="button"
          id="button-addon2"
          onClick={handleSearch}
        >
          Get Weather
        </button>
      </div>
      {weatherData.loading ? (
       /*    <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */
        <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
      ) : weatherData.error ? (
        <p>Error fetching weather data</p>
      ) : weatherData.data ? (
        <div id="weatherInfo">
          <div className="weather-icon text-center">
            <i className="bi bi-cloud-sun"></i>
          </div>
          <div className="weather-info text-center">
            <p>Temperature: {weatherData.data.main.temp}°C</p>
            <p>Weather: {weatherData.data.weather[0].description}</p>
            <p>Humidity: {weatherData.data.main.humidity}%</p>
            <p>Wind Speed: {weatherData.data.wind.speed} m/s</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
