import React, { ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";

/**
 * Converts a Dayjs object to a date string in the format 'MM/DD/YYYY'.
 * @param dayjsValue - The Dayjs object to convert.
 * @returns A date string in the format 'MM/DD/YYYY' or an empty string if the input is null.
 */
export function dayjsToDateString(dayjsValue: dayjs.Dayjs | null): string {
  return dayjsValue ? dayjsValue.format("MM/DD/YYYY") : "";
}

/**
 * Get endDate by startDate and vacationDays
 * @param startDate
 * @param vacationDays
 * @returns A new Dayjs object representing the endDate by adding the vacationDays to the startDate.
 */
export const calculateEndDate = (
  startDate: Dayjs,
  vacationDays: number
): Dayjs => {
  return startDate.add(vacationDays - 1, "day");
};

/**
 * Get total amount of days between two dates
 * @param startDate
 * @param endDate
 * @returns total number of days between the two dates,
 */
export const calculateTotalDays = (
  startDate: Dayjs,
  endDate: Dayjs
): number => {
  return endDate.diff(startDate, "day") + 1; // +1 to include both start and end dates
};

/**
 * validate that the endDate is not before the startDate
 * @param startDate
 * @param endDate
 * @returns true if the endDate is after or the same as the startDate, otherwise false.
 */
export const validateEndDate = (startDate: Dayjs, endDate: Dayjs): boolean => {
  return endDate.isAfter(startDate) || endDate.isSame(startDate);
};

// export const formatStringToDayjs = (dateString: string): Dayjs => {
//   return dayjs(dateString, "DD/MM/YYYY");
// };
