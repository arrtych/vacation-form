import { Dayjs } from "dayjs";
import React from "react";
import { formatDayjsToString } from "../../utils/utils";

interface VacationRangeProps {
  startDate: Dayjs;
  endDate: Dayjs;
}
//todo: rename component name
const VacationRange: React.FC<VacationRangeProps> = (
  props: VacationRangeProps
) => {
  const { startDate, endDate } = { ...props };
  return (
    <div>
      <p>Vacation start: {formatDayjsToString(startDate)}</p>
      <p>Vacation end: {formatDayjsToString(endDate)} </p>
    </div>
  );
};

export default VacationRange;
