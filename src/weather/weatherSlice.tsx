// weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city:any) => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=733ebae1d93a91a5acbac287d1b5fadb&units=metric`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default weatherSlice.reducer;
