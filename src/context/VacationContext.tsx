import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  addVacationRequest,
  fetchVacationRequests,
  deleteVacationRequest,
  fetchUser,
  updateUserAvailableVacationDays,
} from "../service/apiService";
import { VacationFormData, VacationRequest, User } from "../types/types";
import dayjs, { Dayjs } from "dayjs";
import { calculateTotalDays, isAnyAvailableVacationDays } from "../utils/utils";

interface VacationContextProps {
  vacationRequests: VacationRequest[];
  addVacationRequest: (formData: VacationFormData) => Promise<void>;
  deleteVacationRequest: (id: number) => Promise<void>;
  availableVacationDays: number;
  updateAvailableVacationDays: (days: number) => Promise<void>;
  // userId: number;
}

interface VacationProviderProps {
  children: ReactNode;
  userId: number;
}

const VacationContext = createContext<VacationContextProps>({
  vacationRequests: [],
  addVacationRequest: async () => {},
  deleteVacationRequest: async () => {},
  availableVacationDays: 0,
  updateAvailableVacationDays: async () => {},
  // userId: 0,
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
  const addRequest = async (formData: VacationFormData) => {
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
        console.log(
          "totalVacationDays < availableVacationDays",
          totalVacationDays
        );
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
        // userId,
      }}
    >
      {children}
    </VacationContext.Provider>
  );
};
export { VacationContext, VacationContextProvider };
