import React, { useEffect, useCallback } from "react";
import { addCity, removeCity } from "../slice/addCitySlice";
import { useSelector, useDispatch } from "react-redux";
import { citiesArray } from "../slice/addCitySlice";
import { addCityData } from "../slice/addCitySlice";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const AddedCities = () => {
  const dispatch = useDispatch();
  const addedCity = useSelector(addCityData);
  const showCity = useSelector(citiesArray);

  const [sliderRef] = useKeenSlider({
    renderMode: performance,
    mode: "free",
    breakpoints: {
      "(max-width: 575.98px)": {
        slides: { perView: 1.5, spacing: 10 },
      },
      "(min-width: 576px) and (max-width: 767.98px)": {
        slides: { perView: 2.5, spacing: 10 },
      },
      "(min-width: 1200px)": {
        // disabled: showCity.length < 5 ? true : false,
        slides: { perView: 4.5, spacing: 10 },
      },
    },
    slides: {
      perView: 3.5,
      number: showCity.length,
      spacing: 15,
    },
  });

  const changeLocation = useCallback(() => {
    if (
      addedCity &&
      !showCity.some((each) => each.cityName === addedCity.location.name)
    ) {
      dispatch(
        addCity({
          icon: addedCity.current.condition.icon,
          cityName: addedCity.location.name,
          country: addedCity.location.country,
          temp: addedCity.current.temp_c,
          text: addedCity.current.condition.text,
        })
      );
    }
  }, [addedCity, dispatch]);

  useEffect(() => {
    changeLocation();
  }, [addedCity, changeLocation]);


  const handleDeleteCity = (index) => {
    dispatch(removeCity({ index: index }));
  };
  const disabledStyle = {
    display: "flex",
    gap: "0 20px"
  }

  const cityDiv = showCity.map((each, index) => {
    return (
      <Box key={index} className="keen-slider__slide">
        <Box
          sx={{
            maxwidth: "265px",
            width: "100%",
            borderRadius: "25px",
            background: "#1B1A1D",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "15px 0",
          }}
        >
          <Grid container rowGap={1}>
            <Grid item xs={12} sm={12}>
              <img src={each.icon} alt="" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                {each.cityName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography sx={{ fontWeight: "400", fontSize: "14px" }}>
                {each.country}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {Math.round(each.temp) + " °C"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>{each.text}</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => handleDeleteCity(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  });
  return (
    <Grid item xs={12} sm={12} md={9} >
      <Box ref={sliderRef} className="keen-slider">
        {cityDiv}
      </Box>
    </Grid>
  );
};

export default AddedCities;
