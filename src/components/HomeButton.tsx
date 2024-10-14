// src/components/HomeButton.tsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleNavigateHome}>
      Go to Home
    </Button>
  );
};

export default HomeButton;
