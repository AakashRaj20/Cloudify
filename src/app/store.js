import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import inputSlice from "../slice/inputSlice";
import citiesDataSlice from "../slice/citiesDataSlice";
import airQualitySlice from "../slice/airQualitySlice";
import chartSlice from "../slice/chartSlice";
import addCitySlice from "../slice/addCitySlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer = combineReducers({
  inputData: inputSlice,
  citiesData: citiesDataSlice,
  airQuality: airQualitySlice,
  chartData: chartSlice,
  addCity: addCitySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
