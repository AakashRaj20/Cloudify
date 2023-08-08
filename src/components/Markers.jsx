import { useEffect, useCallback } from "react";
import { cityData50 } from "../slice/citiesDataSlice";
import { cityData } from "../slice/inputSlice";
import { useSelector } from "react-redux";
import { Typography, Box, Grid } from "@mui/material";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMap } from "react-leaflet";

const Markers = () => {
  const cities = useSelector(cityData50);
  const selectedCity = useSelector(cityData);
  const maps = useMap();
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const changeLocation = useCallback(() => {
    selectedCity &&
      maps.flyTo(
        [selectedCity.location.lat, selectedCity.location.lon],
        maps.getZoom()
      );
  }, [selectedCity, maps]);

  useEffect(() => {
    changeLocation();
  }, [selectedCity, changeLocation]);

  const icon = (icon, name) => {
    return (
      <Grid
        container
        className="custom-icon"
        sx={{ background: "transparent" }}
      >
        <Grid item xs={12} sm={12}>
          <img src={getWeatherIconUrl(icon)} alt="icon" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography>{name}</Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      {cities &&
        cities.map((city) => (
          <Marker
            eventHandlers={{ changeLocation }}
            key={city.id}
            position={[city.coord.lat, city.coord.lon]}
            icon={L.divIcon({
              className: "custom-icon",
              iconUrl: icon(city.weather[0].icon, city.name),
              iconAnchor: [16, 32],
              iconSize: [40, 40],
              iconPosition: "top",
              popupAnchor: [0, -32],
            })}
          >
            <Popup>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", lineHeight: "30px" }}
                >
                  {city.name}
                </Typography>
                <Typography sx={{ lineHeight: "10px" }}>
                  Temperature: {city.main.temp} °C
                </Typography>
                <Typography sx={{ lineHeight: "10px" }}>
                  Description: {city.weather[0].description}
                </Typography>
                <Typography sx={{ lineHeight: "10px" }}>
                  Humidity: {city.main.humidity}%
                </Typography>
                <Typography sx={{ lineHeight: "10px" }}>
                  Wind: {city.wind.speed} km/h
                </Typography>
                <Typography sx={{ lineHeight: "10px" }}>
                  Cloudiness: {city.clouds.all}%
                </Typography>
                <Typography sx={{ lineHeight: "10px" }}>
                  Pressure: {city.main.pressure} MB
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default Markers;
