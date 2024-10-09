// VacationRequestForm.tsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { VacationRequest } from "../../types/types";
import { VacationContext } from "../../context/VacationContext";
import CustomDatePicker from "../CustomDatePicker";
import styles from "./VacationRequestForm.module.css";
import NumberInput from "../NumberInput";

const VacationRequestForm: React.FC = () => {
  // const { addVacationRequest } = useVacationContext();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reason, setReason] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (startDate && endDate) {
    //   const request: VacationRequest = {
    //     startDate,
    //     endDate,
    //   };
    //   addVacationRequest(request);
    //   setStartDate(null);
    //   setEndDate(null);
    // }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setReason(newValue);
  };

  return (
    <Box className={styles.formBox}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Form page</h2>
        <Grid container spacing={2}>
          <Grid size={12}>
            <NumberInput label={"Vacation Days"} />
          </Grid>
          <Grid size={12}>
            <CustomDatePicker label="Start Date" />
          </Grid>
          <Grid size={12}>
            <CustomDatePicker label="End Date" />
          </Grid>
          <Grid size={12}>
            <TextField
              id="textfield-reason"
              label="Reason"
              variant="outlined"
              value={reason}
              onChange={handleReasonChange}
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.formButton}
            >
              Submit Request
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default VacationRequestForm;

// function useVacationContext(): { addVacationRequest: any } {
//   throw new Error("Function not implemented.");
// }
