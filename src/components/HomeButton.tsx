// src/components/HomeButton.tsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigateHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNavigateHome} // Attach the navigation to button click
    >
      Go to Home
    </Button>
  );
};

export default HomeButton;
