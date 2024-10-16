import { Dayjs } from "dayjs";

export interface VacationRequest {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface VacationFormData {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  reason: string;
}

// export interface userData {
//   userName: string;
//   vacations: VacationRequest[];
//   availableDaysAmount: number;
// }

export interface User {
  id: number;
  name: string;
  availableVacationDays: number;
}
