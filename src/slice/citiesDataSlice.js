import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch50CityData = createAsyncThunk(
  "content/fetch50CityData",
  async ({lon, lat}) => {
    const API_KEY =  process.env.REACT_APP_CITIES_SLICE; 
    const API_URL = "https://api.openweathermap.org/data/2.5/find?";
    const params = {
      lat: lat,
      lon: lon,
      cnt: 50,
      units: "metric",
      lang: "en",
      appid: API_KEY,
    };

    try {
      const response = await axios.get(API_URL, { params });
      return response.data.list;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
);

const initialState = {
    cityData50: null,
    isLoading: false,
}

export const citiesDataSlice = createSlice({
    name: "citiesData",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder.addCase(fetch50CityData.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetch50CityData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cityData50 = action.payload;
      })
    }
})

export default citiesDataSlice.reducer;
export const isLoading = (state) => state.citiesData.isLoading;
export const cityData50 = (state) => state.citiesData.cityData50;
