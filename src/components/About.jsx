import { useState, useEffect, useRef, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Slide,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import About1 from "../images/About1.gif";
import { auth } from "../config/firebase";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const About = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [loading, setLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDisplayName(user.displayName || "");
        setLoading(false);
      } else {
        setUserDisplayName("");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Box sx={{ display: "flex", gap: "20px 0 0 0" }}>
      <Button
        onClick={handleClickOpen("paper")}
        sx={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        About
      </Button>
      <Dialog
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: "17px",
            background: "#1B1A1D",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography
            sx={{ color: "white", fontWeight: "bold", fontSize: "25px" }}
          >
            About
          </Typography>
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "start", sm: "center" },
            alignItems: { xs: "start", sm: "center" },
            gap: "10px 0",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                maxWidth: "210px",
                width: "100%",
                alignSelf: "center",
              }}
              src={About1}
              alt=""
            />
          </Box>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "white",
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Greetings! 👋
            </Typography>
            {!loading && userDisplayName && (
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {userDisplayName}
              </Typography>
            )}
            <Typography>
              I'm a passionate frontend enthusiast, currently a 4th year
              undergraduate pursuing a B.Tech in Electronics and Communication
              Engineering at GL Bajaj Institute of Technology and Management.
              Proficient in HTML, CSS, JavaScript, and frameworks like Material
              UI, Bootstrap, React.js, and Next.js, I've created
              high-performance websites and gained valuable experience through
              internships.
            </Typography>
            <Typography>
              I'm actively seeking a dynamic internship opportunity in React.js
              or Next.js to further develop my skills and contribute to
              innovative projects. Freelancing projects and full-time
              opportunities also intrigue me as I approach graduation. Let's
              collaborate to create something remarkable!
            </Typography>
            <Typography>Looking forward to connecting, </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Aakash Raj
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default About;
