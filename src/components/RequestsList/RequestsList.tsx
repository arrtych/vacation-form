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
import dayjs from "dayjs";
import { calculateTotalDays } from "../../utils/utils";

const RequestsList: React.FC = () => {
  const { vacationRequests, deleteVacationRequest } =
    useContext(VacationContext);
  const tableHeaders = ["#", "Start Date", "End Date", "Amount", "Reason", ""];

  const handleRemoveRequest = async (id: number) => {
    try {
      await deleteVacationRequest(id);
    } catch (error) {
      console.error("Error removing vacation request:", error);
    }
  };

  const getVacationAmount = (startDate: string, endDate: string): number => {
    const startDateStr = dayjs(startDate);
    const endDateStr = dayjs(endDate);
    return calculateTotalDays(startDateStr, endDateStr);
  };
  return (
    <>
      {/* todo: if no request add no-data text */}
      {/* todo: add edit button */}
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
                <TableCell>
                  {getVacationAmount(request.startDate, request.endDate)}
                </TableCell>
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
