import React from "react";
import DialougeBox from "./DialougeBox";
import { Grid, Box, Typography } from "@mui/material";

const AddCities = () => {
  const cities = (
    <Box
      sx={{
        width: "100%",
        borderRadius: "25px",
        background: "#1B1A1D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "15px",
        padding: "20px 40px",
      }}
    >
      <DialougeBox />
      <Typography>World Forecast</Typography>
      <Typography>Add the cities you are interested in.</Typography>
    </Box>
  );
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={3}
      container
      columnGap={2}
      sx={{ padding: { md: "0 20px 0 0" } }}
    >
      {cities}
    </Grid>
  );
};

export default AddCities;
