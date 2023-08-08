import React from "react";
import { Grid, Typography } from "@mui/material";

const Header = () => {
  const date = new Date();
  const day = date.toLocaleString("default", { weekday: "short" });
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const dateNum = date.getDate();
  const hour = date.getHours();

  const greeting = () => {
    if(hour >=12 && hour < 17){
      return "Good Afternoon";
    }else if(hour >= 17 && hour < 20){
      return "Good Evening";
    }else if(hour >= 20 && hour < 24){
      return "Good Night";
    }else{
      return "Good Morning";
    }
  }
  return (
    <Grid item xs={12} sm={12} container padding="0 0 0 6px ">
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>{greeting()}</Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontSize: '20px', fontWeight: '400' }}>{day + ", " + dateNum + " " + month + ", " + year }</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
