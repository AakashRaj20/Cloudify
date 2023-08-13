import { Grid, Typography, Box, Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { cityId } from "../slice/chartSlice";
import { cityData } from "../slice/inputSlice";
import { fetchChartData, isLoading } from "../slice/chartSlice";
import { chartData } from "../slice/chartSlice";
import { useDispatch, useSelector } from "react-redux";

const Chart = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(cityData);
  const data = useSelector(chartData);
  const id = useSelector(cityId);
  const loading = useSelector(isLoading);

  useEffect(() => {
    id?.locations.length > 0 &&
      selectedCity &&
      dispatch(fetchChartData({ id: id?.locations[0].id }));
  }, [selectedCity, dispatch, id]);

  const btn = ["Humidity", "Wind", "Percipitation", "UV Index"];
  const [active, setActive] = useState(0);
  const [param, setParam] = useState("minRelHumidity");
  const [color, setColor] = useState("#253F5A");

  const getDayName = (dateString) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dateObj = new Date(dateString);
    return daysOfWeek[dateObj.getDay()];
  };

  const getMonthName = (dateString) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObj = new Date(dateString);
    return month[dateObj.getMonth()];
  };

  const getDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.getDate();
  };

  const modifiedData = data?.forecast.map((item) => ({
    ...item,
    dayName: getDayName(item.date),
    monthName: getMonthName(item.date),
    date: getDate(item.date),
  }));

  const handleClick = (event, index) => {
    setActive(index);
    switch (index) {
      case 0:
        setParam("minRelHumidity");
        setColor("#253F5A");
        break;
      case 1:
        setParam("maxWindSpeed");
        setColor("#518554");
        break;
      case 2:
        setParam("precipAccum");
        setColor("#FED269");
        break;
      case 3:
        setParam("uvIndex");
        setColor("#FF7C22");
        break;
      default:
        setParam("minRelHumidity");
        setColor("#253F5A");
        break;
    }
  };

  const formatTooltipLabel = (value, param) => {
    switch (param) {
      case "minRelHumidity":
        return "Humidity(%)";
      case "maxWindSpeed":
        return "Wind Speed(km/h)";
      case "precipAccum":
        return "Precipitation(mm)";
      case "uvIndex":
        return "UV Index";
      default:
        return value;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      const customLabel = formatTooltipLabel(dataItem, param);
      return (
        <Grid
          container
          rowGap={2}
          sx={{
            borderRadius: "10px",
            maxWidth: "220px",
            width: "100%",
            background: "#0E0908",
            border: "none",
            color: "white",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              background: `${payload[0].color}`,
              borderRadius: "10px 10px 0 0",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "20px", padding: "6px 15px" }}
            >
              {payload[0].payload.date + " " + payload[0].payload.monthName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              sx={{ fontWeight: "bold", padding: "3px 15px 10px" }}
            >{`${customLabel} : ${dataItem[param]}`}</Typography>
          </Grid>
        </Grid>
      );
    }

    return null;
  };
  const buttons = btn.map((each, index) => {
    return (
      <Grid
        key={index}
        item
        xs={3}
        sm={3}
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
          onClick={(event) => handleClick(event, index)}
        >
          <Typography sx={{ fontSize: { xs: "9px", sm: "15px" } }}>
            {each}
          </Typography>
        </Button>
      </Grid>
    );
  });

  const areaChart = data && (
    <ResponsiveContainer width="95%" height={300}>
      <AreaChart
        width={1150}
        height={300}
        data={modifiedData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="dayName" tickCount={Math.min(modifiedData.length, 8)} />
        <YAxis />
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey={param}
          stroke={color}
          fillOpacity={1}
          fill="url(#colorMax)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={8}
      container
      rowGap={{ xs: 5, sm: 3 }}
      sx={{ padding: { sm: "0 0px", xs: "0 0 5px 0", md: "0 30px 0 0" } }}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "25px", height: "100%" }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            borderRadius: "25px",
            background: "#1B1A1D",
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "justify",
                  padding: { sm: "10px 50px", xs: "20px" },
                }}
              >
                Overview
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "flex-start",
                  sm: "flex-Start",
                  md: "center",
                },
                padding: { sm: "0 50px", xs: "0 20px" },
              }}
            >
              <Grid
                item
                container
                sx={{
                  margin: { sm: "25px 5px", xs: "0 0 20px 0" },
                  alignItems: "center",
                  maxWidth: "500px",
                  width: "100%",
                  borderRadius: "50px",
                  background: "#101014",
                }}
              >
                {buttons}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            {areaChart}
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default Chart;
