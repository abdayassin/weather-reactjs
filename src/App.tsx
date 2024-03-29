// App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from './weather/weatherSlice';
import { Oval } from 'react-loader-spinner';
import {ThunkDispatch} from "@reduxjs/toolkit";
import './App.css'; // Importez votre fichier CSS
const App = () => {
  const [city, setCity] = useState('Tunis');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data, loading, error } = useSelector((state:any) => state.weather);

  const handleSearch = () => {
    dispatch(fetchWeatherData(city));
    setCity('');
  };
  useEffect(() => {
    // Chargez les données météorologiques de Tunis lors du montage du composant
    dispatch(fetchWeatherData(city));
  }, [dispatch]); // Ne spécifiez pas city comme dépendance pour charger uniquement lors du montage initial

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
            if (e.key === 'Enter') {
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
      {loading && (
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
 {error  && (
        <p>Error fetching weather data</p>
      )}   {data && !error && (
        <div id="weatherInfo">
          <div className="weather-icon text-center">
            <i className="bi bi-cloud-sun"></i>
          </div>
          <div className="weather-info text-center">
            <p>Temperature: {data.main.temp}°C</p>
            <p>Weather: {data.weather[0].description}</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
