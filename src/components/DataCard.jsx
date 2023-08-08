import { Grid, Box, Typography, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterData } from "../slice/inputSlice";
import { weatherData, cityData } from "../slice/inputSlice";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { keyType } from "../slice/inputSlice";
import DataBtn from "./DataBtn";
import { chartData } from "../slice/chartSlice";

const DataCard = () => {
  const dispatch = useDispatch();
  const currData = useSelector(cityData);
  const next7DaysData = useSelector(chartData);

  // useEffect(() => {
  //   dispatch(filterData({ info: currData. }));
  // }, [dispatch, currData])

  const data = useSelector(weatherData);
  const key = useSelector(keyType);

  const date = new Date();

  let hours = date.getHours();
  const filterData = key === 0 ? data?.slice(hours) : data;
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? "0" + hours : hours;

  const getDayName = (dateString) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dateObj = new Date(dateString);
    return daysOfWeek[dateObj.getDay()];
  };

  const [sliderRef] = useKeenSlider({
    renderMode: performance,
    mode: "free",
    breakpoints: {
      "(max-width: 575.98px)": {
        slides: { perView: 4.5, spacing: 7 },
      },
      "(min-width: 576px) and (max-width: 767.98px)": {
        slides: { perView: 5.5, spacing: 5, number: key },
      },
      "(min-width: 768px) and (max-width: 991.98px)": {
        slides: { perView: 7.5, spacing: 5, number: key },
      },
      "(min-width: 1200px)": {
        //disabled: weatherData.length < 5 ? true : false,
        slides: { perView: 11.5, spacing: 5 },
      },
    },
    slides: {
      perView: 9.5,
      number: key,
      spacing: 5,
    },
  });

  const mainData = currData && (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ padding: "20px" }}
    >
      <Grid item xs={6} sm={2}>
        <Box sx={{ maxWidth: "100px", width: "100%" }}>
          <Tooltip title={currData.current.condition.text}>
            <img
              style={{ width: "100%" }}
              src={currData.current.condition.icon}
              alt=""
            />
          </Tooltip>
        </Box>
      </Grid>
      <Grid item xs={6} sm={4} sx={{ padding: { xs: "0 0 0 60px", sm: "0" } }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "21px", sm: "30px", md: "40px" },
            textAlign: { xs: "center", sm: "justify" },
          }}
        >
          {currData.location.name}
        </Typography>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { xs: "13px", sm: "15px", md: "20px" },
            textAlign: { xs: "center", sm: "justify" },
          }}
        >
          {currData.location.country}
        </Typography>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "25px", sm: "40px" },
            textAlign: { xs: "center", sm: "justify" },
          }}
        >
          {Math.round(currData.current.feelslike_c)}
        </Typography>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { sm: "20px" },
            textAlign: { xs: "center", sm: "justify" },
          }}
        >
          Temprature
        </Typography>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Box
          display="flex"
          alignItems="baseline"
          gap="0 3px"
          sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "25px", sm: "40px" },
              textAlign: { xs: "center", sm: "justify" },
            }}
          >
            {currData.current.humidity}
          </Typography>
          <Typography
            sx={{
              textAlign: { xs: "center", sm: "justify" },
              fontWeight: "bold",
              fontSize: { xs: "15px", sm: "20px" },
            }}
          >
            %
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { sm: "20px" },
            textAlign: { xs: "center", sm: "justify" },
          }}
        >
          Humidity
        </Typography>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Box
          display="flex"
          alignItems="baseline"
          gap="0 3px"
          sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "25px", sm: "40px" },
              textAlign: { xs: "center", sm: "justify" },
            }}
          >
            {Math.round(currData.current.wind_kph)}
          </Typography>
          <Typography
            sx={{
              textAlign: { xs: "center", sm: "justify" },
              fontWeight: "bold",
              fontSize: { xs: "15px", sm: "20px" },
            }}
          >
            km/h
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { sm: "20px" },
            textAlign: { xs: "center", sm: "justify" },
          }}
        >
          Wind Speed
        </Typography>
      </Grid>
    </Grid>
  );
  const forecastCard =
    filterData &&
    filterData.map((each, index) => {
      return (
        <Box key={index} className="keen-slider__slide">
          <Box
            sx={{
              borderRadius: "20px",
              background: "#BBD8EC",
              maxWidth: "80px",
              width: "100%",
              color: "black",
              textAlign: "center",
              alignItems: "center",
              padding: "15px 0",
              display: "flex",
            }}
          >
            <Grid
              container
              rowGap={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                  }}
                >
                  {parseInt(each.time.substring(11)) > 12
                    ? parseInt(each.time.substring(11)) - 12 + " PM"
                    : parseInt(each.time.substring(11)) + " AM"}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <img src={each.condition.icon} alt="icon-img" />
              </Grid>
              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontSize: "40px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                  }}
                >
                  {Math.round(each.feelslike_c)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    });

  const next7DaysCard =
    next7DaysData &&
    next7DaysData.forecast.map((each, index) => {
      return (
        <Box key={index} className="keen-slider__slide">
          <Box>
            <Box
              sx={{
                borderRadius: "20px",
                background: "#BBD8EC",
                maxWidth: "80px",
                width: "100%",
                color: "black",
                textAlign: "center",
                alignItems: "center",
                padding: "15px 0",
                display: "flex",
              }}
            >
              <Grid
                container
                rowGap={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={12}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                    }}
                  >
                    {getDayName(each.date)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <img
                    src={`https://www.foreca.com/public/images/symbols/${each.symbol}.svg`}
                    alt="icon-img"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography
                    sx={{
                      fontSize: "40px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                    }}
                  >
                    {Math.round(each.minFeelsLikeTemp)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      );
    });

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={8}
      container
      sx={{ padding: { sm: "0 0px", xs: "0 0 5px 0", md: "0 30px 0 0" } }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          background: "#1B1A1D",
          width: "100%",
          borderRadius: "25px",
        }}
      >
        <Grid
          conatiner
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={12} sm={12}>
            {mainData}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ textAlign: "justify", padding: "10px 20px" }}
          >
            <DataBtn />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ padding: "0 20px 20px" }}>
            <Box ref={sliderRef} className="keen-slider">
              {key === 2 ? next7DaysCard : forecastCard}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default DataCard;
