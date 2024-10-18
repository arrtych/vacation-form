import axios from "axios";
import { VacationRequest, VacationFormData, User } from "../types/types";

const API_BASE_URL = "http://localhost:8080/";

export const fetchVacationRequests = async (): Promise<VacationRequest[]> => {
  try {
    const response = await axios.get<VacationRequest[]>(
      API_BASE_URL + "vacation_requests/"
    );
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
    const formattedFormData = {
      ...formData,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    const response = await axios.post<VacationRequest>(
      API_BASE_URL + "vacation_requests/",
      formattedFormData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding vacation request:", error);
    throw error;
  }
};

export const deleteVacationRequest = async (id: number): Promise<void> => {
  try {
    await axios.delete(API_BASE_URL + `vacation_requests/${id}`);
  } catch (error) {
    console.error("Error deleting vacation request:", error);
    throw error;
  }
};

export const fetchUser = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get<User>(API_BASE_URL + `users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUserAvailableVacationDays = async (
  userId: number,
  availableVacationDays: number
): Promise<User> => {
  try {
    const response = await axios.patch<User>(API_BASE_URL + `users/${userId}`, {
      availableVacationDays,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user available vacation days:", error);
    throw error;
  }
};

export const updateVacationRequest = async (
  id: number,
  formData: VacationFormData
): Promise<VacationRequest> => {
  try {
    const formattedFormData = {
      ...formData,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    const response = await axios.put<VacationRequest>(
      API_BASE_URL + `vacation_requests/${id}`,
      formattedFormData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vacation request:", error);
    throw error;
  }
};
