import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  addVacationRequest,
  fetchVacationRequests,
  deleteVacationRequest,
  fetchUser,
  updateUserAvailableVacationDays,
  updateVacationRequest,
} from "../service/apiService";
import { VacationRequest, User } from "../types/types";
import dayjs, { Dayjs } from "dayjs";
import { calculateTotalDays, isAnyAvailableVacationDays } from "../utils/utils";

interface VacationContextProps {
  vacationRequests: VacationRequest[];
  addVacationRequest: (formData: VacationRequest) => Promise<void>;
  deleteVacationRequest: (id: number) => Promise<void>;
  availableVacationDays: number;
  updateAvailableVacationDays: (days: number) => Promise<void>;
  updateVacationRequest: (
    id: number,
    formData: VacationRequest
  ) => Promise<void>;
}

interface VacationProviderProps {
  children: ReactNode;
  userId: number;
}

const VacationContext = createContext<VacationContextProps>({
  vacationRequests: [],
  addVacationRequest: async () => {},
  deleteVacationRequest: async () => {},
  updateVacationRequest: async () => {},
  availableVacationDays: 0,
  updateAvailableVacationDays: async () => {},
});

const VacationContextProvider: React.FC<VacationProviderProps> = ({
  children,
  userId,
}) => {
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>(
    []
  );
  const [availableVacationDays, setAvailableVacationDays] = useState<number>(0);

  // Fetch vacation requests from the API
  const fetchRequests = async () => {
    try {
      const requests = await fetchVacationRequests();
      setVacationRequests(requests);
    } catch (error) {
      console.error("Error fetching vacation requests:", error);
    }
  };

  // Add a new vacation request via the API
  const addRequest = async (formData: VacationRequest) => {
    try {
      const newStartDate = dayjs(formData.startDate);
      const newEndDate = dayjs(formData.endDate);
      const totalVacationDays = calculateTotalDays(newStartDate, newEndDate);

      if (
        !isAnyAvailableVacationDays(
          newStartDate,
          newEndDate,
          availableVacationDays
        )
      ) {
        throw new Error("Total vacation days exceed available vacation days.");
      } else {
        const newRequest = await addVacationRequest(formData);
        setVacationRequests([...vacationRequests, newRequest]);

        // Update available vacation days
        const updatedAvailableVacationDays =
          availableVacationDays - totalVacationDays;
        await updateUserAvailableVacationDays(
          userId,
          updatedAvailableVacationDays
        );
        setAvailableVacationDays(updatedAvailableVacationDays);
      }
    } catch (error) {
      console.error("Error adding vacation request:", error);
    }
  };

  // Remove a vacation request via the API
  const deleteRequest = async (id: number) => {
    try {
      const requestToRemove = vacationRequests.find(
        (request) => request.id === id
      );
      if (requestToRemove) {
        const startDate = dayjs(requestToRemove.startDate);
        const endDate = dayjs(requestToRemove.endDate);
        const removedVacationDays = endDate.diff(startDate, "day") + 1;

        await deleteVacationRequest(id);
        setVacationRequests(
          vacationRequests.filter((request) => request.id !== id)
        );

        // Update available vacation days
        const updatedAvailableVacationDays =
          availableVacationDays + removedVacationDays;
        await updateUserAvailableVacationDays(
          userId,
          updatedAvailableVacationDays
        );
        setAvailableVacationDays(updatedAvailableVacationDays);
      }
    } catch (error) {
      console.error("Error deleting vacation request:", error);
    }
  };

  // Update an existing vacation request via the API
  const updateRequest = async (id: number, formData: VacationRequest) => {
    try {
      const oldRequest = vacationRequests.find((request) => request.id === id);
      if (!oldRequest) {
        console.error("Vacation request not found.");
        throw new Error("Vacation request not found.");
      }

      const oldStartDate = dayjs(oldRequest.startDate);
      const oldEndDate = dayjs(oldRequest.endDate);
      const oldTotalVacationDays = calculateTotalDays(oldStartDate, oldEndDate);

      const newStartDate = dayjs(formData.startDate);
      const newEndDate = dayjs(formData.endDate);
      const newTotalVacationDays = calculateTotalDays(newStartDate, newEndDate);

      // Calculate the difference in vacation days
      const vacationDaysDifference =
        newTotalVacationDays - oldTotalVacationDays;

      // Check if the new request exceeds available vacation days
      if (vacationDaysDifference > availableVacationDays) {
        console.error("Total vacation days exceed available vacation days.");
        throw new Error("Total vacation days exceed available vacation days.");
      }

      // Update the vacation request
      const updatedRequest = await updateVacationRequest(id, formData);
      setVacationRequests(
        vacationRequests.map((request) =>
          request.id === id ? updatedRequest : request
        )
      );

      // Update available vacation days
      const updatedAvailableVacationDays =
        availableVacationDays - vacationDaysDifference;
      await updateUserAvailableVacationDays(
        userId,
        updatedAvailableVacationDays
      );
      setAvailableVacationDays(updatedAvailableVacationDays);
    } catch (error) {
      console.error("Error updating vacation request:", error);
      throw error; // Re-throw the error to handle it at a higher level if needed
    }
  };

  // Update available vacation days
  const updateAvailableVacationDays = async (days: number) => {
    try {
      await updateUserAvailableVacationDays(userId, days);
      setAvailableVacationDays(days);
    } catch (error) {
      console.error("Error updating available vacation days:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const user = await fetchUser(userId);
      // console.log("User", user);
      setAvailableVacationDays(user.availableVacationDays);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchUserData();
  }, []);

  return (
    <VacationContext.Provider
      value={{
        vacationRequests,
        addVacationRequest: addRequest,
        deleteVacationRequest: deleteRequest,
        availableVacationDays,
        updateAvailableVacationDays,
        updateVacationRequest: updateRequest,
      }}
    >
      {children}
    </VacationContext.Provider>
  );
};
export { VacationContext, VacationContextProvider };
