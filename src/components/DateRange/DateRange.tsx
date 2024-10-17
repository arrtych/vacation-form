import { Dayjs } from "dayjs";
import React from "react";
import { dayjsToDateString } from "../../utils/utils";

//todo: check custom day/calendar props.
interface DateRangeProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

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
