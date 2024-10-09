import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CustomDay from "./CustomDay";

dayjs.extend(isBetween);

interface CustomCalendarProps {
  startDate: Dayjs;
  endDate: Dayjs;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  startDate,
  endDate,
}) => {
  const [value, setValue] = useState<Dayjs>(startDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue as Dayjs)}
        slots={{
          day: (dayProps) => (
            <CustomDay {...dayProps} startDate={startDate} endDate={endDate} />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomCalendar;
