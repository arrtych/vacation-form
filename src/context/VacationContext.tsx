import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  addVacationRequest,
  fetchVacationRequests,
} from "../service/apiService";
import { VacationFormData, VacationRequest } from "../types/types";
import { formatStringToDayjs } from "../utils/utils";

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
  const addRequest = async (formData: VacationFormData) => {
    try {
      const newRequest = await addVacationRequest(formData);
      setVacationRequests([...vacationRequests, newRequest]);
    } catch (error) {
      console.error("Error adding vacation request:", error);
    }
  };

  useEffect(() => {
    // const formData: VacationFormData = {
    //   id: 0,
    //   startDate: formatStringToDayjs("12/10/2024"),
    //   endDate: formatStringToDayjs("14/10/2024"),
    //   reason: "some",
    // };
    // addRequest(formData);
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
