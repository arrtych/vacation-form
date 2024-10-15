import React from "react";
import "./App.css";
import { VacationContextProvider } from "./context/VacationContext";
import VacationApp from "./components/VacationApp";

function App() {
  return (
    <VacationContextProvider userId={1}>
      <VacationApp />
    </VacationContextProvider>
  );
}

export default App;
