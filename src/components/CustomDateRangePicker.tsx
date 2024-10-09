// import dayjs from "dayjs";
// import React, { useState } from "react";
// import { DatePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TextField, Box } from "@mui/material";

// const CustomDateRangePicker: React.FC = () => {
//   // State variables to manage start and end dates
//   const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
//     dayjs("2022-04-17")
//   );
//   const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
//     dayjs("2022-04-21")
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box display="flex" justifyContent="space-between" gap={2}>
//         {/* Start Date Picker */}
//         <DatePicker
//           label="Start Date"
//           value={startDate}
//           onChange={(newValue) => setStartDate(newValue)} // Update start date on change
//           inputFormat="MM/DD/YYYY" // Set the desired date format for input
//           // Use the TextFieldComponent prop to customize the input component
//           TextFieldComponent={(props) => <TextField {...props} />} // Directly render TextField
//         />
//         {/* End Date Picker */}
//         <DatePicker
//           label="End Date"
//           value={endDate}
//           onChange={(newValue) => setEndDate(newValue)} // Update end date on change
//           inputFormat="MM/DD/YYYY" // Set the desired date format for input
//           // Use the TextFieldComponent prop to customize the input component
//           TextFieldComponent={(props) => <TextField {...props} />} // Directly render TextField
//         />
//       </Box>
//     </LocalizationProvider>
//   );
// };

import React from "react";

const CustomDateRangePicker: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default CustomDateRangePicker;
