import React, { ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";
import { VacationRequest } from "../types/types";

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
 * Check if user has available vacation days
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

/**
 * Format date in string into format with month name
 * @param dateString
 * @returns
 */
export const formatToFullDate = (dateString: string): string => {
  const date: Dayjs = dayjs(dateString, "MM/DD/YYYY");
  return date.format("D MMMM YYYY");
};

/**
 * Check if the requested vacation dates overlap with any existing vacation requests.
 * @param startDate
 * @param endDate
 * @param requests
 * @returns true if dates overlap
 */
export const isOverlapping = (
  startDate: Dayjs,
  endDate: Dayjs,
  requests: VacationRequest[]
): boolean => {
  for (const request of requests) {
    const checkStartDate = dayjs(request.startDate);
    const checkEndDate = dayjs(request.endDate);

    // Check if the intervals overlap
    if (startDate.isBefore(checkEndDate) && checkStartDate.isBefore(endDate)) {
      return true;
    }
    if (
      startDate.isSame(checkStartDate) ||
      endDate.isSame(checkEndDate) ||
      startDate.isSame(checkEndDate) ||
      endDate.isSame(checkStartDate)
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Check vacation request status
 * @param request
 * @returns status as string
 */
export const getVacationRequestStatus = (request: VacationRequest): string => {
  const today = dayjs();
  const startDate = dayjs(request.startDate);
  const endDate = dayjs(request.endDate);
  let status = "";
  if (startDate.isAfter(today, "day")) {
    status = "upcoming";
  } else if (today.isBetween(startDate, endDate, "day", "[]")) {
    status = "active";
  } else if (endDate.isBefore(today, "day")) {
    status = "past";
  } else {
    status = "unknown";
  }
  return status.toUpperCase();
};
