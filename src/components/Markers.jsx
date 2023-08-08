import { useEffect, useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import { cityData50 } from "../slice/citiesDataSlice";
import { cityData } from "../slice/inputSlice";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
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

  const icon = (iconCode, name) => {
    return L.divIcon({
      className: "custom-icon",
      html: ReactDOMServer.renderToString(
        <div className="custom-icon-container">
          <div className="custom-icon-image">
            <img src={getWeatherIconUrl(iconCode)} alt="icon" />
          </div>
          <div className="custom-icon-name-div">
            <p className="custom-icon-name">{name}</p>
          </div>
        </div>
      ),
      iconAnchor: [16, 32],
      iconSize: [40, 40],
      iconPosition: "top",
      popupAnchor: [0, -32],
    });
  };
  return (
    <>
      {cities &&
        cities.map((city) => (
          <Marker
            eventHandlers={{ changeLocation }}
            key={city.id}
            position={[city.coord.lat, city.coord.lon]}
            icon={icon(city.weather[0].icon, city.name)}
          >
            <Popup className="custom-popup">
              <Box sx={{ width: "100%", color: "white" }}>
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
