import React, { useContext } from "react";
import { VacationContext } from "../context/VacationContext";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "../pages/Home/Home";
import FormPage from "../pages/FormPage/FormPage";

const VacationApp: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default VacationApp;
