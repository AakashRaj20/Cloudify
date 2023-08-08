import { useState } from "react";
import { cityData } from "../slice/inputSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import { showData, filterData } from "../slice/inputSlice";
import { chartData } from "../slice/chartSlice";

const DataBtn = () => {
  const [btnState, setBtnState] = useState(0);

  const dispatch = useDispatch();
  const data = useSelector(cityData);
  const next7DaysData = useSelector(chartData);

  const activeSx = {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "30px",
    fontStyle: "norma",
    fontWeight: "500",
    lineHeight: "normal",
  };

  const inactiveSx = {
    color: "#6D6D71",
    fontFamily: "Inter",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
  };

  const handleClick = (event, key) => {
    dispatch(showData({ type: key }));
    setBtnState(key);
    if(key === 0 || key === 1){
        dispatch(filterData({ info: data.forecast.forecastday[key].hour  }));
    }
  };

  const buttons = ["Today", "Tommorow", "Next 7 days"];

  console.log(data);

  return (
    <Grid xs={12} sm={12} container>
      {buttons.map((each, index) => {
        return (
          <Grid item xs={4} sm={2} key={index}>
            <Button
              sx={btnState === index ? activeSx : inactiveSx}
              variant="text"
              onClick={(event) => handleClick(event, index)}
            >
              <Typography sx={{ fontSize: { xs: '13px', md: '18px' } }}>{each}</Typography>
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DataBtn;
