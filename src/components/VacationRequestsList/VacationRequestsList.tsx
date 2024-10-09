// VacationRequestsList.tsx
import React, { useContext } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { VacationContext } from "../../context/VacationContext";
// import { useVacationContext } from "./context/VacationContext";

const VacationRequestsList: React.FC = () => {
  const { vacationRequests } = useContext(VacationContext);

  return (
    <List>
      {/* {vacationRequests.map((request, index) => ( */}
      <ListItem>
        {/* <ListItemText
            primary={`Start Date: ${request.startDate.toLocaleDateString()}`}
            secondary={`End Date: ${request.endDate.toLocaleDateString()}`}
          /> */}
        <ListItemText primary="ssd" secondary="second" />
      </ListItem>
      {/* ))} */}
    </List>
  );
};

export default VacationRequestsList;
function useVacationContext(): { vacationRequests: any } {
  throw new Error("Function not implemented.");
}
