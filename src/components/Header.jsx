import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { auth } from "../config/firebase";

const Header = () => {
  const date = new Date();
  const day = date.toLocaleString("default", { weekday: "short" });
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const dateNum = date.getDate();
  const hour = date.getHours();

  const [loading, setLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState("");

  const greeting = () => {
    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
      return "Good Evening";
    } else if (hour >= 20 && hour < 24) {
      return "Good Night";
    } else {
      return "Good Morning";
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDisplayName(user.displayName || "");
        setLoading(false);
      }else {
        setUserDisplayName(""); 
        setLoading(false);
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  return (
    <Grid id="header" item xs={12} sm={12} container padding="0 0 0 6px ">
      <Grid item xs={12} sm={12} sx={{ display: {xs: 'block', sm: 'flex'}, alignItems: {sm: 'baseline'}, gap: {sm : '0 12px'}}}>
        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
          {greeting()}
        </Typography>
        {!loading && userDisplayName && (
          <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
            {userDisplayName}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
          {day + ", " + dateNum + " " + month + ", " + year}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
