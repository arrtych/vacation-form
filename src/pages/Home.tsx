import React, { useContext } from "react";
import RequestsList from "../components/RequestsList/RequestsList";
import ExampleComponent from "../components/ExampleComponent";
import { VacationContext } from "../context/VacationContext";
import TotalDays from "../components/TotalDays/TotalDays";
import CustomModal from "../components/CustomModal/CustomModal";

const Home: React.FC = () => {
  const { availableVacationDays } = useContext(VacationContext);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <TotalDays amount={availableVacationDays} />
      <RequestsList />

      {/* <ExampleComponent /> */}
    </div>
  );
};

export default Home;
