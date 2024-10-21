// src/components/HomeButton.tsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CancelButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleNavigateHome}>
      Cancel
    </Button>
  );
};

export default CancelButton;
