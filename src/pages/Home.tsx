import React from "react";
import RequestsList from "../components/RequestsList/RequestsList";
import ExampleComponent from "../components/ExampleComponent";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      <RequestsList />
      {/* <ExampleComponent /> */}
    </div>
  );
};

export default Home;
