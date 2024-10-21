import { Box } from "@mui/material";
import React from "react";
import VacationRequestForm from "../../components/VacationRequestForm/VacationRequestForm";
import styles from "./FormPage.module.css";

const FormPage: React.FC = () => {
  return (
    <Box className={styles.box}>
      <VacationRequestForm />
    </Box>
  );
};

export default FormPage;
