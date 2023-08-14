import { useEffect, useState } from "react";
import {
  Fab,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchAddCity } from "../slice/addCitySlice";
import { useDispatch, useSelector } from "react-redux";
import { addCityData } from "../slice/addCitySlice";
import { auth, db, googleAuthProvider } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { where, query } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

const DialougeBox = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const addedCity = useSelector(addCityData);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [dbCollectionRef, setDbCollectionRef] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
        setUserId(user.uid);
        setDbCollectionRef(collection(db, "users", user.uid, "AddCities"));
      } else {
        setLoading(false);
        setUserId("");
        setDbCollectionRef(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (addedCity && dbCollectionRef) {
      const addCityToDb = async () => {
        try {
          const cityData = {
            icon: addedCity.current.condition.icon,
            name: addedCity.location.name,
            country: addedCity.location.country,
            temp: addedCity.current.temp_c,
            text: addedCity.current.condition.text,
          };

          const existingCityQuery = query(
            dbCollectionRef,
            where("name", "==", cityData.name)
          );

          const existingCityDocs = await getDocs(existingCityQuery);

          if (existingCityDocs.size === 0) {
            await addDoc(dbCollectionRef, cityData);
          }
        } catch (error) {
          console.error(error);
        }
      };

      addCityToDb();
    }
  }, [addedCity, dbCollectionRef]);

  const handleClickOpen = () => {
    if (!userId) {
      signInWithPopup(auth, googleAuthProvider);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const handleAddCity = async () => {
    try {
      dispatch(fetchAddCity({ city: city }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        PaperProps={{
          sx: {
            borderRadius: "17px",
            background: "#1B1A1D",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>World Forecast</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Add the city you are interested in.</Typography>
          </DialogContentText>
          <TextField
            autoFocus
            value={city}
            onChange={handleChange}
            margin="dense"
            id="name"
            label="Add City"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={() => {
              handleAddCity();
              handleClose();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DialougeBox;
