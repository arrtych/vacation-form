import React, { useContext } from "react";
import { VacationContext } from "../context/VacationContext";

const VacationApp: React.FC = () => {
  const { vacationRequests, addVacationRequest } = useContext(VacationContext);

  return <div>App here</div>;
};

export default VacationApp;
