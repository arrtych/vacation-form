import React, { useContext } from "react";
import { VacationContext } from "../context/VacationContext";
import { VacationFormData } from "../types/types";
import { formatStringToDayjs } from "../utils/utils";

const ExampleComponent: React.FC = () => {
  const { vacationRequests, addVacationRequest } = useContext(VacationContext);

  const handleAddRequest = async () => {
    const formData: VacationFormData = {
      id: 0,
      startDate: "12/10/2024",
      endDate: "14/10/2024",
      reason: "some new",
    };
    await addVacationRequest(formData);
  };

  return (
    <div>
      <button onClick={handleAddRequest}>Add Vacation Request</button>
      <ul>
        {vacationRequests.map((request) => (
          <li key={request.id}>
            {request.startDate} - {request.endDate}: {request.reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleComponent;
