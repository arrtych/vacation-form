import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DialogProps } from "@mui/material/Dialog";

interface CustomDatePickerProps {
  label: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = (
  props: CustomDatePickerProps
) => {
  const { label } = { ...props };
  // const dialogProps: DialogProps = {
  //   sx: {
  //     "& .MuiPaper-root": {
  //       width: "100%", // Ensure the modal takes full width of its parent
  //       maxWidth: "none", // Remove the default max-width constraint
  //     },
  //   },
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          sx={{
            // width: "61%",
            width: "100%",
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
