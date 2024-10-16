// CustomDay.tsx
import React from "react";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Dayjs } from "dayjs";

interface CustomDayProps extends PickersDayProps<Dayjs> {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const CustomDay: React.FC<CustomDayProps> = (props) => {
  const { day, startDate, endDate, ...other } = props;

  //if startDate && endDate defined
  const dateSet = startDate && endDate;
  const isInRange = dateSet && day.isBetween(startDate, endDate, "day", "[]");

  const isStart = day.isSame(startDate, "day");
  const isEnd = day.isSame(endDate, "day");

  return (
    //todo: style in file
    <PickersDay
      {...other}
      day={day}
      sx={{
        ...(isInRange && {
          // backgroundColor: 'rgba(25, 118, 210, 0.5)',
          backgroundColor: "#1976d2",
          color: "white",
          // "&:hover": {
          //   // backgroundColor: 'rgba(25, 118, 210, 0.7)',
          //   backgroundColor: "#1976d2",
          // },
        }),
        ...(isStart && {
          backgroundColor: "#1976d2",
          color: "white",
          // "&:hover": {
          //   backgroundColor: "#1976d2",
          // },
        }),
        ...(isEnd && {
          backgroundColor: "#1976d2",
          color: "white",
          // "&:hover": {
          //   backgroundColor: "#1976d2",
          // },
        }),
      }}
    />
  );
};

export default CustomDay;
