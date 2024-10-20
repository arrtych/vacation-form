import { Dayjs } from "dayjs";

export interface VacationRequest {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface User {
  id: number;
  name: string;
  availableVacationDays: number;
}
