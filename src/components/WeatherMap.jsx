import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetch50CityData } from "../slice/citiesDataSlice";
import { cityData } from "../slice/inputSlice";
import { useSelector, useDispatch } from "react-redux";
import Markers from "./Markers";

const WeatherMap = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(cityData);
  useEffect(() => {
    selectedCity &&
      dispatch(
        fetch50CityData({
          lon: selectedCity?.location.lon,
          lat: selectedCity?.location.lat,
        })
      );
  }, [selectedCity, dispatch]);

  const [zoomLevel, setZoomLevel] = useState(12);

  const handleZoomChange = (e) => {
    setZoomLevel(e.target._zoom);
  };

  const [center, setCenter] = useState([19.076, 72.8777]);
  useEffect(() => {
    selectedCity &&
      setCenter([selectedCity.location.lat, selectedCity.location.lon]);
  }, [selectedCity]);

  const maps = (
    <MapContainer
      center={center}
      zoom={zoomLevel}
      style={{ width: "100%", height: "412px", borderRadius: "20px" }}
      onZoomEnd={handleZoomChange}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Temperature">
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=85716d70713b33bf033f8a37df623121`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Precipitation">
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=85716d70713b33bf033f8a37df623121`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Wind">
          <TileLayer
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=85716d70713b33bf033f8a37df623121`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Clear Map" checked="Clear Map">
          <TileLayer
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Markers />
    </MapContainer>
  );

  return (
    <Grid item xs={12} sm={12} md={4} container>
      {maps}
    </Grid>
  );
};

export default WeatherMap;
