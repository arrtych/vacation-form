// src/types.ts
export interface VacationRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface VacationFormData {
  startDate: string;
  endDate: string;
  reason: string;
}
