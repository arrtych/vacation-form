// VacationRequestForm.tsx
import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Alert, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { VacationFormData, VacationRequest } from "../../types/types";
import { VacationContext } from "../../context/VacationContext";
import CustomDatePicker from "../CustomDatePicker";
import styles from "./VacationRequestForm.module.css";
import NumberInput from "../NumberInput";
import dayjs, { Dayjs } from "dayjs";
import CustomCalendar from "../CustomCalendar";
import DateRange from "../DateRange/DateRange";
import TotalDays from "../TotalDays/TotalDays";
import HomeButton from "../HomeButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  dayjsToDateString,
  calculateEndDate,
  calculateTotalDays,
  validateEndDate,
  isAnyAvailableVacationDays,
} from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const VacationRequestForm: React.FC = () => {
  const {
    vacationRequests,
    addVacationRequest,
    availableVacationDays,
    updateAvailableVacationDays,
  } = useContext(VacationContext);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [reason, setReason] = useState<string>("");
  const [vacationDays, setVacationDays] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setErrorMessage("End Date cannot be before Start Date.");
  // }, []);

  useEffect(() => {
    console.log("Updated Start Date:", startDate);
    checkFormFields();
  }, [startDate]);

  useEffect(() => {
    console.log("Updated End Date:", endDate);
    checkFormFields();
  }, [endDate]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let startDateString = "";
    let endDateString = "";

    if (startDate && endDate) {
      startDateString = dayjsToDateString(startDate);
      endDateString = dayjsToDateString(endDate);

      const formData: VacationFormData = {
        id: 0,
        userId: 1,
        startDate: startDateString,
        endDate: endDateString,
        reason: reason,
      };

      if (
        isAnyAvailableVacationDays(startDate, endDate, availableVacationDays)
      ) {
        await addVacationRequest(formData);
        console.log("formData", formData);
        resetFormFields();
        navigate("/");
      }
    }

    // try {
    // } catch (error) {
    //   console.error("Error submitting vacation request:", error);
    // }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setReason(newValue);
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    checkFormFields();
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
  };

  const handleVacationDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;

    // const parsedValue = newValue === "" ? "" : Number(newValue);
    setVacationDays(Number(newValue));
  };

  const resetFormFields = () => {
    setStartDate(null);
    setEndDate(null);
    setReason("");
    setVacationDays(0);
  };

  const checkFormFields = () => {
    if (startDate && vacationDays > 0) {
      const calculatedEndDate = calculateEndDate(startDate, vacationDays);
      console.log("calculatedEndDate", calculatedEndDate);
      setEndDate(calculatedEndDate);
    }

    if (startDate && endDate && vacationDays == 0) {
      setVacationDays(calculateTotalDays(startDate, endDate));
    }

    if (startDate && endDate) {
      if (!validateEndDate(startDate, endDate)) {
        setErrorMessage("End Date cannot be before Start Date.");
        setEndDate(null);
        if (vacationDays <= 0) setVacationDays(0);
        return;
      }
    }
  };

  // const changeEndDate = () => {
  //   if (startDate && endDate && vacationDays != 0) {
  //     setEndDate(endDate);
  //   }
  // };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <Grid container rowSpacing={1} className={styles.container}>
        <Grid size={12} className={styles.title}>
          <h2>Vacation form</h2>
        </Grid>

        <Grid size={12}>
          <TotalDays amount={availableVacationDays} />
        </Grid>

        <Grid size={12}>
          <NumberInput
            label={"Vacation Days"}
            value={vacationDays}
            onChange={handleVacationDaysChange}
          />
        </Grid>

        <Grid size={12}>
          <CustomDatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Grid>

        {errorMessage && (
          <Grid size={12}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorMessage("");
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {errorMessage}
            </Alert>
          </Grid>
        )}

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

        <Grid size={12}>
          <DateRange startDate={startDate} endDate={endDate} />
        </Grid>

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
