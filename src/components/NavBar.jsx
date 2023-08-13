import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import Link from "@mui/material/Link";
import {
  Grid,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Button,
} from "@mui/material";
import Logo from "../Logo";
import { auth, googleAuthProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import About from "./About";

const drawerWidth = 230;
const NavBar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setPhotoURL(user.photoURL);
        setLoading(false);
      } else {
        setPhotoURL("");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Grid container>
        <Grid item xs={12}>
          <Link color="inherit" underline="none" href="#header">
            <IconButton>
              <Logo />
            </IconButton>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ margin: "0 0 10px 0" }} />
        </Grid>
        <Grid item xs={12}>
          {!loading && photoURL ? (
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleSignOut}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                SignOut
              </Typography>
            </Button>
          ) : (
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleSignIn}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                SignIn
              </Typography>
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }}>
          <About />
        </Grid>
        <Grid item xs={12}>
          <Link color="inherit" underline="none" href="#footer">
            <Button
              sx={{
                textTransform: "none",
                color: "white",
              }}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Contact
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const menu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>
        {!loading && photoURL ? (
          <Button
            variant="text"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
            onClick={handleSignOut}
          >
            <Logout
              sx={{ margin: "0 12px 0 0" }}
              fontSize="small"
              onClick={handleSignOut}
            />
            SignOut
          </Button>
        ) : (
          <Button
            variant="text"
            sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
            onClick={handleSignIn}
          >
            <LoginIcon
              sx={{ margin: "0 12px 0 0" }}
              fontSize="small"
              onClick={handleSignIn}
            />
            SignIn
          </Button>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <Grid item xs={12} sm={12} container>
            <Grid
              item
              xs={2}
              sx={{
                display: { xs: "flex", sm: "none" },
              }}
            >
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                alignItems: "center",
              }}
            >
              <Link color="inherit" underline="none" href="#header">
                <IconButton>
                  <Logo />
                </IconButton>
              </Link>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "0 20px",
              }}
            >
              {!loading && photoURL ? (
                <Button
                  variant="text"
                  sx={{ color: "white", display: { xs: "none", sm: "block" } }}
                  onClick={handleSignOut}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    SignOut
                  </Typography>
                </Button>
              ) : (
                <Button
                  variant="text"
                  sx={{ color: "white", display: { xs: "none", sm: "block" } }}
                  onClick={handleSignIn}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    SignIn
                  </Typography>
                </Button>
              )}
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                <About />
              </Box>
              <Link color="inherit" href="#footer" underline="none">
                <Typography
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Contact
                </Typography>
              </Link>
              <Box>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {!loading && photoURL ? (
                    <Avatar alt="" src={photoURL} />
                  ) : (
                    <Avatar />
                  )}
                </IconButton>
                {menu}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
export default NavBar;
