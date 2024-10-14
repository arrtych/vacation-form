import { Dayjs } from "dayjs";

export interface VacationRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface VacationFormData {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface userData {
  userName: string;
  vacations: VacationRequest[];
  availableDaysAmount: number;
}
