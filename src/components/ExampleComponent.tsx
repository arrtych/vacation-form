import React, { useContext, useState } from "react";
import { VacationContext } from "../context/VacationContext";
import { VacationFormData } from "../types/types";

const ExampleComponent: React.FC = () => {
  const {
    vacationRequests,
    addVacationRequest,
    deleteVacationRequest,
    availableVacationDays,
  } = useContext(VacationContext);

  // const [formData, setFormData] = useState<VacationFormData>({
  //   startDate: "",
  //   endDate: "",
  //   reason: "",
  // });

  const formData: VacationFormData = {
    id: 0,
    startDate: "12/10/2024",
    endDate: "14/10/2024",
    reason: "some new",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("input", value);
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
  };

  const handleAddRequest = async () => {
    try {
      await addVacationRequest(formData);
      // setFormData({ startDate: "", endDate: "", reason: "" });
    } catch (error) {
      console.error("Error adding vacation request:", error);
    }
  };

  const handleRemoveRequest = async (id: number) => {
    try {
      await deleteVacationRequest(id);
    } catch (error) {
      console.error("Error removing vacation request:", error);
    }
  };

  return (
    <div>
      <h1>Vacation Requests</h1>
      <div>
        <h2>Available Vacation Days: {availableVacationDays}</h2>
        <form>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Reason:
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleAddRequest}>
            Add Request
          </button>
        </form>
      </div>
      <div>
        <h2>Current Requests</h2>
        <ul>
          {vacationRequests.map((request) => (
            <li key={request.id}>
              {request.startDate} to {request.endDate} - {request.reason}
              <button onClick={() => handleRemoveRequest(request.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExampleComponent;
