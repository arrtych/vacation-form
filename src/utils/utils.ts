import React, { ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";

export const formatDayjsToString = (date: Dayjs): string => {
  return date.format("DD/MM/YYYY");
};
