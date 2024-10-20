// src/components/Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeIcon from "@mui/icons-material/Home";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{
            flexGrow: "1",
            display: "flex",
            alignItems: "center",
          }}
        >
          <EventIcon />
          Vacation Management App
        </Typography>

        <Button color="inherit" component={Link} to="/">
          <HomeIcon />
          Home
        </Button>
        <Button color="inherit" component={Link} to="/form">
          <AddCircleOutlineIcon />
          New vacation
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
