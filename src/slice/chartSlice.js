import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_CHART_SLICE;

export const fetchChartData = createAsyncThunk(
  "content/fetchChartData",
  async ({ id }) => {
    const options = {
      method: "GET",
      url: `https://foreca-weather.p.rapidapi.com/forecast/daily/${id}`,
      params: {
        alt: "0",
        tempunit: "C",
        windunit: "MS",
        periods: "8",
        dataset: "full",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const fetchCityId = createAsyncThunk(
  "content/fetchCityId",
  async ({ city }) => {
    const options = {
      method: "GET",
      url: `https://foreca-weather.p.rapidapi.com/location/search/${city}`,
      params: {
        lang: "en",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  isLoading: false,
  chartData: null,
  cityId: null,
};

export const chartSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChartData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chartData = action.payload;
    });
    builder.addCase(fetchCityId.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCityId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cityId = action.payload;
    });
  },
});

export default chartSlice.reducer;
export const isLoading = (state) => state.chartData.isLoading;
export const chartData = (state) => state.chartData.chartData;
export const cityId = (state) => state.chartData.cityId;
