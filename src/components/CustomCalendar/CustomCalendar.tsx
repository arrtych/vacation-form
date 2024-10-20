import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CustomDay from "../CustomDay/CustomDay";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});
//todo: check custom day props
interface CustomCalendarProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  startDate,
  endDate,
}) => {
  const [value, setValue] = useState<Dayjs>(startDate || dayjs());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue as Dayjs)}
        readOnly
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
