// VacationRequestsList.tsx
import React, { useContext } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { VacationContext } from "../../context/VacationContext";

const RequestsList: React.FC = () => {
  const { vacationRequests, deleteVacationRequest } =
    useContext(VacationContext);
  const tableHeaders = ["Id", "Start Date", "End Date", "Amount", "Reason", ""];

  const handleRemoveRequest = async (id: number) => {
    try {
      await deleteVacationRequest(id);
    } catch (error) {
      console.error("Error removing vacation request:", error);
    }
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="request table" className="request-table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, idx) => (
                <TableCell
                  key={`${header}-${idx}`}
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vacationRequests.map((request, idx) => (
              <TableRow
                key={request.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    // cursor: "pointer",
                  },
                }}
              >
                <TableCell key={idx}>{request.id}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                {/* todo: calculate amount */}
                <TableCell>Amount</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveRequest(request.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RequestsList;
