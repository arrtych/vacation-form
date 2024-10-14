import React, { ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";

//todo: add format exceptions
export const formatDayjsToString = (date: Dayjs): string => {
  return date.format("DD/MM/YYYY");
};

export const formatStringToDayjs = (dateString: string): Dayjs => {
  return dayjs(dateString, "DD/MM/YYYY");
};
