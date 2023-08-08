import { useState } from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fetchAddCity } from "../slice/addCitySlice";
import { useDispatch } from "react-redux";

const DialougeBox = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const handleAddCity = () => {
    dispatch(fetchAddCity({ city: city }));
  };

  return (
    <Box sx={{ borderRadius: "25px", background: "#1B1A1D" }}>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>World Forecast</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the city you are interested in.
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button
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
