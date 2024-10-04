import axios from "axios";
import { VacationRequest, VacationFormData } from "../types/types";

const API_BASE_URL = "http://localhost:3000/vacation_requests/";

export const fetchVacationRequests = async (): Promise<VacationRequest[]> => {
  try {
    const response = await axios.get<VacationRequest[]>(API_BASE_URL);
    // const response = await fetch(API_BASE_URL);
    // const data = await response.json();
    return response.data;
  } catch (error) {
    console.error("Error fetching vacation requests:", error);
    throw error;
  }
};

export const addVacationRequest = async (
  formData: VacationFormData
): Promise<VacationRequest> => {
  try {
    const response = await axios.post<VacationRequest>(API_BASE_URL, formData);
    // const response = await fetch(API_BASE_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const data = await response.json();
    return response.data;
  } catch (error) {
    console.error("Error adding vacation request:", error);
    throw error;
  }
};
