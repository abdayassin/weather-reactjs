// store.js
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather/weatherSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
