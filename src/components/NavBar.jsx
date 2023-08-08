import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import Logo from "../Logo";

const drawerWidth = 230;
const NavBar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <IconButton>
          <Logo />
        </IconButton>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link color="inherit" underline="none">
              <ListItemText primary="About" />
            </Link>
            <Link color="inherit" underline="none" href="#footer">
              <ListItemText primary="Contact" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
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
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <Grid item xs={12} sm={12} container nowrap>
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
              <IconButton>
                <Logo />
              </IconButton>
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
              <Link color="inherit" underline="none">
                <Typography
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  About
                </Typography>
              </Link>
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
                  <Avatar />
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
