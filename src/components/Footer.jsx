import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Profile from "../images/profile_pic.png";

const Footer = () => {
  return (
    <Grid item xs={12} sm={12} container id="footer">
      <Box
        sx={{
          width: "100%",
          borderRadius: "25px",
          background: "#1B1A1D",
        }}
      >
        <Grid container rowGap={2} padding="20px">
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ maxWidth: "150px", width: "100%", borderRadius: "60%" }}
              src={Profile}
              alt={"Aakash Raj"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>Hi there!</Typography>
            <Typography>Contact me</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0 30px",
            }}
          >
            <Link href={`mailto:aakashraj914@gmail.com`} target="_blank">
              <EmailIcon fontSize="large" color="success" />
            </Link>
            <Link href="https://github.com/AakashRaj20" target="_blank">
              <GitHubIcon fontSize="large" color="success" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/aakashraj20/"
              target="_blank"
            >
              <LinkedInIcon fontSize="large" color="success" />
            </Link>
            <Link href=" https://twitter.com/AakashRaj2003" target="_blank">
              <TwitterIcon fontSize="large" color="success" />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Footer;
