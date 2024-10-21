import React, { useContext } from "react";
import RequestsList from "../../components/RequestsList/RequestsList";

import { VacationContext } from "../../context/VacationContext";
import TotalDays from "../../components/TotalDays/TotalDays";
import styles from "./Home.module.css";
import { Avatar, Box } from "@mui/material";

const Home: React.FC = () => {
  const { availableVacationDays } = useContext(VacationContext);

  return (
    <Box className={styles.box}>
      <Avatar className={styles.avatar}>AL</Avatar>
      <h2>User vacation requests</h2>
      <TotalDays amount={availableVacationDays} />
      <RequestsList />
    </Box>
  );
};

export default Home;
