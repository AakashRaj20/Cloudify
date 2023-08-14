import React, { useEffect, useCallback, useState } from "react";
import { addCityFromDb, removeCity, addCity } from "../slice/addCitySlice";
import { useSelector, useDispatch } from "react-redux";
import { citiesArray } from "../slice/addCitySlice";
import { addCityData } from "../slice/addCitySlice";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { db } from "../config/firebase";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { auth } from "../config/firebase";

const AddedCities = () => {
  const dispatch = useDispatch();
  const addedCity = useSelector(addCityData);
  const showCity = useSelector(citiesArray);
  const [dbdata, setDbData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbCollectionRef, setDbCollectionRef] = useState(null);

  const ResizePlugin = (slider) => {
    const observer = new ResizeObserver(function () {
      slider.update();
    });

    slider.on("created", () => {
      observer.observe(slider.container);
    });
    slider.on("destroyed", () => {
      observer.unobserve(slider.container);
    });
  };

  const MutationPlugin = (slider) => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        slider.update();
      });
    });
    const config = { childList: true };

    slider.on("created", () => {
      observer.observe(slider.container, config);
    });
    slider.on("destroyed", () => {
      observer.disconnect();
    });
  };

  const [sliderRef, slider] = useKeenSlider(
    {
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
          slides: { perView: 4.5, spacing: 10 },
        },
      },
      slides: {
        perView: 3.5,
        spacing: 15,
      },
    },
    [ResizePlugin, MutationPlugin]
  );

  useEffect(() => {
    const handleAuthStateChanged = (user) => {
      if (user) {
        setLoading(true);
        const userCollectionRef = collection(
          db,
          "users",
          user.uid,
          "AddCities"
        );
        setDbCollectionRef(userCollectionRef);

        const fetchData = async () => {
          try {
            const data = await getDocs(userCollectionRef);
            const filteredData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setDbData(filteredData);
            dispatch(addCityFromDb({ data: filteredData }));
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };

        fetchData();
      } else {
        setLoading(false);
        setDbData([]);
        setDbCollectionRef(null);
        dispatch(addCityFromDb({ data: [] })); // Clear the data in Redux when user logs out
      }
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const deleteCityFromDb = async (id) => {
    try {
      const cityDoc = doc(db, "users", auth.currentUser.uid, "AddCities", id);
      await deleteDoc(cityDoc);
    } catch (error) {
      console.error(error);
    }
  };

  //add new cities in redux store
  const handleAddNewCity = useCallback(() => {
    if (
      addedCity &&
      showCity.some((each) => each.name === addedCity.location.name) === false
    ) {
      dispatch(
        addCity({
          icon: addedCity?.current.condition.icon,
          name: addedCity?.location.name,
          country: addedCity?.location.country,
          temp: addedCity?.current.temp_c,
          text: addedCity?.current.condition.text,
        })
      );
    }
  }, [addedCity, dispatch]);

  useEffect(() => {
    handleAddNewCity();
  }, [addedCity, handleAddNewCity]);

  const handleDeleteCity = (index) => {
    dispatch(removeCity({ index: index }));
  };

  const cityDiv = showCity.map((each, index) => {
    return (
      <Box ref={sliderRef} key={index} className="keen-slider__slide">
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
                {each.name}
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
                onClick={() => {
                  deleteCityFromDb(each.id);
                  handleDeleteCity(index);
                }}
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
    <Grid item xs={12} sm={12} md={9}>
      <Box ref={sliderRef} className="keen-slider">
        {!loading ? cityDiv : <></>}
      </Box>
    </Grid>
  );
};

export default AddedCities;
