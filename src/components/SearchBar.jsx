import { Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchCityData } from "../slice/inputSlice";
import { fetchCityId } from "../slice/chartSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [loc, setLoc] = useState("Mumbai");
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchCityData({city : loc}));
    dispatch(fetchCityId({city : loc}));
  };
  const handleChange = (event) => {
    setLoc(event.target.value);
  };
  //console.log(loc);
  return (
    <Grid container>
      <Grid item xs={12} sm={7} md={4}> 
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            value={loc}
            id="outlined-basic"
            placeholder="search city..."
            name="search"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              borderRadius: "50px",
            }}
          />
        </form>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
