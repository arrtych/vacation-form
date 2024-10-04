import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  addVacationRequest,
  fetchVacationRequests,
} from "../service/apiService";
import { VacationFormData, VacationRequest } from "../types/types";

interface VacationContextProps {
  vacationRequests: VacationRequest[];
  addVacationRequest: (formData: VacationFormData) => Promise<void>;
}

interface VacationProviderProps {
  children: ReactNode;
}

const VacationContext = createContext<VacationContextProps>({
  vacationRequests: [],
  addVacationRequest: async () => {},
});

const VacationContextProvider: React.FC<VacationProviderProps> = ({
  children,
}) => {
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>(
    []
  );

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
  const addRequest = async (formData: any) => {
    try {
      const newRequest = await addVacationRequest(formData);
      setVacationRequests([...vacationRequests, newRequest]);
    } catch (error) {
      console.error("Error adding vacation request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <VacationContext.Provider
      value={{ vacationRequests, addVacationRequest: addRequest }}
    >
      {children}
    </VacationContext.Provider>
  );
};
export { VacationContext, VacationContextProvider };
