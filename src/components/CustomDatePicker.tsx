import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CustomDatePickerProps {
  label: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = (
  props: CustomDatePickerProps
) => {
  const { label } = { ...props };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label={label} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
