import { Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import DataCard from "./components/DataCard";
import WeatherMap from "./components/WeatherMap";
import Chart from "./components/Chart";
import AddCities from "./components/AddCities";
import MiniChart from "./components/MiniChart";
import AddedCities from "./components/AddedCities";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { fetchCityData } from "./slice/inputSlice";
import { fetch50CityData } from "./slice/citiesDataSlice";
import { fetchCityId } from "./slice/chartSlice";
import "./App.css";
import { useEffect } from "react";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCityData({ city: "Mumbai" }));
    dispatch(fetch50CityData({ lon: 72.878176, lat: 19.0785451 }));
    dispatch(fetchCityId({ city: "Mumbai" }));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid
        className="App"
        container
        rowGap={4}
        sx={{
          padding: { xs: "100px 10px 10px", sm: "100px 25px 25px", md: "100px 30px 30px" },
        }}
      >
        <NavBar />
        <Header />
        <SearchBar />
        <DataCard />
        <WeatherMap />
        <Chart />
        <MiniChart />
        <AddCities />
        <AddedCities />
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
