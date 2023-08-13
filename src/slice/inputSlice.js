import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCityData = createAsyncThunk(
  "content/fetchContent",
  async ({ city }) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: city,
        days: "3",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_INPUT_SLICE,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
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
  cityData: null,
  isLoading: false,
  weatherData: null,
  keyType: 0,
};

export const inputSlice = createSlice({
  name: "inputData",
  initialState,
  reducers: {
    showData: (state, action) => {
      const {type} = action.payload;
      state.keyType = type;
    },
    filterData: (state, action) => {
      const { info } = action.payload;
      state.weatherData = info;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCityData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCityData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cityData = action.payload;
    });
  },
});

export default inputSlice.reducer;
export const isLoading = (state) => state.inputData.isLoading;
export const cityData = (state) => state.inputData.cityData;
export const weatherData = (state) => state.inputData.weatherData;
export const keyType = (state) => state.inputData.keyType;
export const { showData, filterData } = inputSlice.actions;
