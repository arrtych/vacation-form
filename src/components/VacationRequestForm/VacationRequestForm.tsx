// VacationRequestForm.tsx
import React, { useContext, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { VacationRequest } from "../../types/types";
import { VacationContext } from "../../context/VacationContext";
import CustomDatePicker from "../CustomDatePicker";
import styles from "./VacationRequestForm.module.css";
import NumberInput from "../NumberInput";
import dayjs, { Dayjs } from "dayjs";
import CustomCalendar from "../CustomCalendar";
import VacationRange from "../VacationRange/VacationRange";
import TotalDays from "../TotalDays/TotalDays";
import HomeButton from "../HomeButton";

//todo: rename component name
const VacationRequestForm: React.FC = () => {
  const {
    vacationRequests,
    addVacationRequest,
    deleteVacationRequest,
    availableVacationDays,
  } = useContext(VacationContext);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
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

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
  };

  const startDateJs = dayjs("2024-10-15");
  const endDateJs = dayjs("2024-10-17"); //may be add multiple calendar components.
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Grid container rowSpacing={1} className={styles.container}>
        <Grid size={12} className={styles.title}>
          <h2>Vacation form</h2>
        </Grid>

        <Grid size={12}>
          <TotalDays amount={availableVacationDays} />
        </Grid>

        <Grid size={12}>
          <NumberInput label={"Vacation Days"} value={0} />
        </Grid>

        <Grid size={12}>
          <CustomDatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Grid>

        <Grid size={12}>
          <CustomDatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            id="textfield-reason"
            label="Reason"
            variant="outlined"
            value={reason}
            fullWidth
            onChange={handleReasonChange}
          />
        </Grid>

        <Grid size={12}>
          <CustomCalendar startDate={startDate} endDate={endDate} />
        </Grid>

        {/* <Grid size={12}>
          <VacationRange startDate={startDate} endDate={endDate} />
        </Grid> */}

        <Grid size={12} className={styles.formButtons}>
          <HomeButton />
          <Button type="submit" variant="contained" color="primary">
            Submit Form
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VacationRequestForm;
