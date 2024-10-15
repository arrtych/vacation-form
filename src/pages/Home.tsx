import React from "react";
import VacationRequestsList from "../components/VacationRequestsList/VacationRequestsList";
import ExampleComponent from "../components/ExampleComponent";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* <VacationRequestsList /> */}
      <ExampleComponent />
    </div>
  );
};

export default Home;
