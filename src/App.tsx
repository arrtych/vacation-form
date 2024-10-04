import React from "react";
import "./App.css";
import { VacationContextProvider } from "./context/VacationContext";
import VacationApp from "./components/VacationApp";

function App() {
  return (
    <VacationContextProvider>
      <VacationApp />
    </VacationContextProvider>
  );
}

export default App;
