import { Dayjs } from "dayjs";
import React from "react";
import { dayjsToDateString } from "../../utils/utils";

interface DateRangeProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
//todo: rename component name
const DateRange: React.FC<DateRangeProps> = (props: DateRangeProps) => {
  const { startDate, endDate } = { ...props };
  return (
    <div>
      {/* todo: check formatDayjsToString */}
      <p>Vacation start: {startDate && dayjsToDateString(startDate)}</p>
      <p>Vacation end: {endDate && dayjsToDateString(endDate)} </p>
    </div>
  );
};

export default DateRange;
