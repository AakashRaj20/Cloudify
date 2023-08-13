import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_ADD_CITY_SLICE

export const fetchAddCity = createAsyncThunk(
  "content/fetchAddCity",
  async ({ city }) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: city,
        days: "3",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
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
  isLoading: false,
  citiesArray: [],
  addCityData: null,
};

export const addCitySlice = createSlice({
  name: "addCity",
  initialState,
  reducers: {
    addCityFromDb: (state, action) => {
      const { data } = action.payload;
      state.citiesArray = data;
    },
    addCity: (state, action) => {
      const {icon, name, country, temp, text} = action.payload;
      state.citiesArray.unshift({icon, name, country, temp, text});
    },
    removeCity: (state, action) => {
      const { index } = action.payload;
      state.citiesArray.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddCity.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddCity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addCityData = action.payload;
    });
  },
});

export default addCitySlice.reducer;
export const { addCityFromDb, removeCity, addCity } = addCitySlice.actions;
export const isLoading = (state) => state.addCity.isLoading;
export const addCityData = (state) => state.addCity.addCityData;
export const citiesArray = (state) => state.addCity.citiesArray;
