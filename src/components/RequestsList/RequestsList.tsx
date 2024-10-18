// VacationRequestsList.tsx
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { VacationContext } from "../../context/VacationContext";
import VacationRequestForm from "../VacationRequestForm/VacationRequestForm";
import dayjs from "dayjs";
import { calculateTotalDays } from "../../utils/utils";
import styles from "./RequestsList.module.css";
import CustomModal from "../CustomModal/CustomModal";

const RequestsList: React.FC = () => {
  const { vacationRequests, deleteVacationRequest, availableVacationDays } =
    useContext(VacationContext);
  const [editingRequest, setEditingRequest] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tableHeaders = [
    "#",
    "Start Date",
    "End Date",
    "Days Amount",
    "Reason",
    "",
    // "",
  ];

  const handleRemoveRequest = async (id: number) => {
    try {
      await deleteVacationRequest(id);
    } catch (error) {
      console.error("Error removing vacation request:", error);
    }
  };

  const handleUpdateRequest = async (id: number) => {
    setEditingRequest(id);
    setModalOpen(true);
  };

  const handleCloseForm = () => {
    setEditingRequest(null);
    setModalOpen(false);
  };

  const getVacationAmount = (startDate: string, endDate: string): number => {
    const startDateStr = dayjs(startDate);
    const endDateStr = dayjs(endDate);
    return calculateTotalDays(startDateStr, endDateStr);
  };

  return (
    <Box className={styles.box}>
      {/* todo: if no request add no-data text */}
      {editingRequest && (
        <>
          <CustomModal
            content={
              <VacationRequestForm
                requestToEdit={vacationRequests.find(
                  (req) => req.id === editingRequest
                )}
                onClose={handleCloseForm}
              />
            }
            open={modalOpen}
            onClose={handleCloseForm}
          />
        </>
      )}

      <TableContainer>
        <Table aria-label="request table" className="request-table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, idx) => (
                <TableCell
                  key={`${header}-${idx}`}
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="center"
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
                <TableCell key={idx} align="center">
                  {request.id}
                </TableCell>
                <TableCell align="center">{request.startDate}</TableCell>
                <TableCell align="center">{request.endDate}</TableCell>
                <TableCell align="center">
                  {getVacationAmount(request.startDate, request.endDate)}
                </TableCell>
                <TableCell align="center">{request.reason}</TableCell>

                <TableCell align="center">
                  <div className={styles.actionButtons}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateRequest(request.id)}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveRequest(request.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </TableCell>

                {/* <TableCell align="center">

                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestsList;
