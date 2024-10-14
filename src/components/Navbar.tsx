// src/components/Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";

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
          Vacation App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/form">
          Form Page
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
