import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { keyType } from "../slice/inputSlice";
import { fetchAirQualityData } from "../slice/airQualitySlice";
import { airQualityData } from "../slice/airQualitySlice";
import { cityData } from "../slice/inputSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography, Skeleton } from "@mui/material";

const MiniChart = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(cityData);
  const airQuality = useSelector(airQualityData);
  const key = useSelector(keyType);
  const [active, setActive] = useState(0);

  useEffect(() => {
    selectedCity &&
      dispatch(
        fetchAirQualityData({
          city: selectedCity?.location?.name,
        })
      );
  }, [selectedCity, dispatch]);

  const [parentWidth, setParentWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setParentWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [parentWidth]);

  const btn = ["Rain", "Air Quality"];

  const handleClick = (event, index) => {
    setActive(index);
  };

  const Buttons = (
    <>
      {btn.map((each, index) => {
        return (
          <Grid
            item
            xs={6}
            sm={6}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              sx={{
                color: "white",
                "&.MuiButton-root": {
                  borderRadius: "20px",
                },
                width: "100%",
              }}
              variant={active === index ? "contained" : "text"}
              key={index}
              onClick={(event) => handleClick(event, index)}
            >
              <Typography sx={{ fontSize: { xs: "11px", sm: "15px" } }}>
                {each}
              </Typography>
            </Button>
          </Grid>
        );
      })}
    </>
  );

  const value =
    active === 0
      ? selectedCity?.forecast?.forecastday[key].day.daily_chance_of_rain
      : airQuality?.overall_aqi;

  const currentValueText = active === 0 ? "Chances of Rain" : "Air Quality";

  const segmentColors =
    active === 0
      ? ["#FF7C22", "#555555", "#ADCADE", "#253F5A"]
      : ["#518554", "#FED269", "#FF7C22", "#C01F1E", "#875783", "#551A8B"];

  const customSegmentLabels =
    active === 0
      ? [
          { text: "Sunny", position: "INSIDE", color: "white" },
          { text: "Little", position: "INSIDE", color: "white" },
          {
            text: "Moderate",
            position: "INSIDE",
            color: "white",
          },
          { text: "Heavy", position: "INSIDE", color: "white" },
        ]
      : [
          {
            text: "Best",
            position: "INSIDE",
            color: "white",
          },
          {
            text: "Good",
            position: "INSIDE",
            color: "white",
          },
          {
            text: "Moderate",
            position: "INSIDE",
            color: "white",
          },
          {
            text: "Poor",
            position: "INSIDE",
            color: "white",
          },
          {
            text: "Unhealthy",
            position: "INSIDE",
            color: "white",
          },
          {
            text: "Hazardous",
            position: "INSIDE",
            color: "white",
          },
        ];

  const customSegmentStops =
    active === 0 ? [0, 25, 50, 75, 100] : [0, 50, 100, 200, 300, 400, 500];

  const needleColor = active === 0 ? "#518554" : "#253F5A";

  const maxValue = active === 0 ? 100 : 500;

  const segmentCount = active === 0 ? 4 : 6;

  const chart = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 500,
        width: "100%",
      }}
    >
      <ReactSpeedometer
        width={Math.min(500, parentWidth - 30)}
        forceRender={true}
        value={value}
        segments={segmentCount}
        minValue={0}
        maxValue={maxValue}
        needleColor={needleColor}
        needleHeightRatio={0.7}
        customSegmentStops={customSegmentStops}
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        currentValueText={currentValueText}
        segmentColors={segmentColors}
        customSegmentLabels={customSegmentLabels}
      />
    </Box>
  );

  return (
    <Grid item xs={12} sm={12} md={4} container>
      <Box
        sx={{
          width: "100%",
          borderRadius: "25px",
          background: "#1B1A1D",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              margin: "40px 50px",
              maxWidth: "240px",
              width: "100%",
              borderRadius: "50px",
              background: "#101014",
            }}
          >
            {Buttons}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ maxWidth: "500px", width: "100%" }}>{chart}</Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default MiniChart;
