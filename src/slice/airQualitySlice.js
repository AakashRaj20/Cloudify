import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAirQualityData = createAsyncThunk("content/fetchAirQualityData", async({city}) => {

const options = {
  method: "GET",
  url: "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality",
  params: { city: city },
  headers: {
    "X-RapidAPI-Key": "03ea7d33d0msh2ddcb3b26528cb1p1ea52ajsnf815c18ed655",
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