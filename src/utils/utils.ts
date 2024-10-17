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

export const calculateStartDate = (
  endDate: Dayjs,
  vacationDays: number
): Dayjs => {
  return endDate.subtract(vacationDays - 1, "day");
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
 * validate that the endDate is not before the startDate and startDate not after endDate
 * @param startDate
 * @param endDate
 * @returns true if the endDate is after or the same as the startDate or starDate is after endDate, otherwise false.
 */
export const validateEndDate = (startDate: Dayjs, endDate: Dayjs): boolean => {
  // Check if start date is after end date
  if (startDate.isAfter(endDate)) {
    return false;
  }
  return endDate.isAfter(startDate) || endDate.isSame(startDate);
};

/**
 *
 * @param startDate
 * @param endDate
 * @returns True if user has available vacation days
 */
export const isAnyAvailableVacationDays = (
  startDate: Dayjs,
  endDate: Dayjs,
  availableVacationDays: number
): boolean => {
  const totalVacationDays = calculateTotalDays(startDate, endDate);
  return totalVacationDays <= availableVacationDays;
};

// export const formatStringToDayjs = (dateString: string): Dayjs => {
//   return dayjs(dateString, "DD/MM/YYYY");
// };
