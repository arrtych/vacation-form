import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Alert, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { VacationFormData, VacationRequest } from "../../types/types";
import { VacationContext } from "../../context/VacationContext";
import CustomDatePicker from "../CustomDatePicker";
import styles from "./VacationRequestForm.module.css";
import NumberInput from "../NumberInput";
import dayjs, { Dayjs } from "dayjs";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
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
  calculateStartDate,
} from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../AlertMessage";

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
  const [errorDateMessage, setErrorDateMessage] = useState<string | null>(null);
  const [errorFormMessage, setErrorFormMessage] = useState<string | null>(null);

  const [vacationDaysError, setVacationDaysError] = useState<string | null>(
    null
  );
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setErrorFormMessage(
  //     "User has no available vacation days. Please edit this or other vacation requests."
  //   );
  // }, []);

  useEffect(() => {
    validateFields();
  }, [vacationDays, startDate, endDate]);

  useEffect(() => {
    changeStartDate();
    // console.log("Updated Start Date:", startDate);
  }, [startDate]);

  useEffect(() => {
    // checkFormFields();
    changeEndDate();
    // console.log("Updated End Date:", endDate);
  }, [endDate]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateFields()) {
      return;
    }

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
      } else {
        setErrorFormMessage(
          "You don't have enough available vacation days. Please edit this or other vacation requests."
        );
      }
    }
  };

  const validateFields = (): boolean => {
    let isValid = true;

    if (!vacationDays || vacationDays <= 0) {
      setVacationDaysError(
        "Vacation days are required and must be greater than 0."
      );
      isValid = false;
    } else {
      setVacationDaysError(null);
    }

    if (!startDate) {
      setStartDateError("Start date is required.");
      isValid = false;
    } else {
      setStartDateError(null);
    }

    if (!endDate) {
      setEndDateError("End date is required.");
      isValid = false;
    } else {
      setEndDateError(null);
    }

    return isValid;
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

  const handleVacationDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(event.target.value);
    const previousValue = vacationDays;

    if (startDate && endDate) {
      if (newValue > previousValue) {
        // increase input
        const nextEndDate = endDate.add(1, "day");
        setEndDate(nextEndDate);
      } else {
        const previousEndDate = endDate.subtract(1, "day");
        setEndDate(previousEndDate);
      }
      console.log("handleVacationDaysChange +-");
    }
    setVacationDays(newValue);
  };

  const resetFormFields = () => {
    setStartDate(null);
    setEndDate(null);
    setReason("");
    setVacationDays(0);
  };

  const changeStartDate = () => {
    if (startDate && vacationDays > 0 && !endDate) {
      console.log("checkFormFields: sstartDate && vacationDays > 0");
      const calculatedEndDate = calculateEndDate(startDate, vacationDays);
      // console.log("calculatedEndDate", calculatedEndDate);
      setEndDate(calculatedEndDate);
      // return 0;
    }

    if (startDate && endDate && vacationDays === 0) {
      setVacationDays(calculateTotalDays(startDate, endDate));
      console.log("startDate && endDate && vacationDays == 0");
    }

    if (startDate && endDate && vacationDays > 0) {
      setVacationDays(calculateTotalDays(startDate, endDate));
    }
  };

  const changeEndDate = () => {
    if (endDate && vacationDays > 0 && !startDate) {
      console.log("changeEndDate: sstartDate && vacationDays > 0");
      const calculatedStartDate = calculateStartDate(endDate, vacationDays);
      // console.log("calculatedStartDate", calculatedStartDate);
      setStartDate(calculatedStartDate);
    }

    if (startDate && endDate && vacationDays === 0) {
      setVacationDays(calculateTotalDays(startDate, endDate));
      console.log("startDate && endDate && vacationDays == 0");
    }

    if (startDate && endDate) {
      if (!validateEndDate(startDate, endDate)) {
        console.log("validateEndDate");
        setErrorDateMessage("End Date cannot be before Start Date.");
        setEndDate(null);
        setStartDate(startDate);
        // if (vacationDays <= 0)
        setVacationDays(0);
      }
    }

    if (startDate && endDate && vacationDays > 0) {
      setVacationDays(calculateTotalDays(startDate, endDate));
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <Grid container rowSpacing={1} className={styles.container}>
        <Grid size={12} className={styles.title}>
          <h2>Vacation form</h2>
        </Grid>

        {errorFormMessage && (
          <AlertMessage
            message={errorFormMessage}
            onClick={() => setErrorFormMessage("")}
          />
        )}

        <Grid size={12}>
          <TotalDays amount={availableVacationDays} />
        </Grid>

        <Grid size={12} className="vacation-days-field">
          {isSubmitted && vacationDaysError && (
            <AlertMessage message={vacationDaysError} />
          )}
          <NumberInput
            label={"Vacation Days"}
            value={vacationDays}
            onChange={handleVacationDaysChange}
          />
        </Grid>

        <Grid size={12}>
          {isSubmitted && startDateError && (
            <AlertMessage message={startDateError} />
          )}
          <CustomDatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Grid>

        {errorDateMessage && (
          <AlertMessage
            message={errorDateMessage}
            onClick={() => setErrorDateMessage("")}
          />
        )}

        <Grid size={12}>
          {isSubmitted && endDateError && (
            <AlertMessage message={endDateError} />
          )}
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
