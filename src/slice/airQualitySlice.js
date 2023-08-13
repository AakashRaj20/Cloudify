import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_AIR_QUALITY_SLICE;

export const fetchAirQualityData = createAsyncThunk("content/fetchAirQualityData", async({city}) => {

const options = {
  method: "GET",
  url: "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality",
  params: { city: city },
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  return response.data;
} catch (error) {
  console.error(error);
}
})

const initialState ={
    isLoading: false,
    airQualityData: null,
}

export const airQualitySlice = createSlice({
    name: 'airQuality',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAirQualityData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAirQualityData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.airQualityData = action.payload;
        });
    }
});

export default airQualitySlice.reducer;
export const isLoading = (state) => state.airQuality.isLoading;
export const airQualityData = (state) => state.airQuality.airQualityData;