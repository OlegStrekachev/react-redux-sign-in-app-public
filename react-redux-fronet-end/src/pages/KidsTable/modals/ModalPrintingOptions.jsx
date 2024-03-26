// Importing necessary React and Redux hooks, components, and styles
import { useSelector, useDispatch } from "react-redux";
import GenericButton from "../../../components/generics/GenericButton";
import { IsLoading } from "../../../components/lifecycle/IsLoading";
import { IsError } from "../../../components/lifecycle/IsError";
import styles from "./ModalPrintingOptions.module.css";
import { closeModal } from "../../../redux-slices/modalSlice";
import { useEffect } from "react";

import { usePrintScheduleMutation } from "../../../redux-slices/sliceApi";

// Component for deleting a specific record
export const ModalPrintingOptions = () => {
  // Initializing Redux dispatch function
  const dispatch = useDispatch();

  // Mutation hook from RTK Query for posting a new record
  const [printSchedule, { isLoading, isError, error, isSuccess }] =
    usePrintScheduleMutation();

  // Function to handle record deletion
  const handlePrintCurrentWeek = async () => {
    try {
      // Using RTK Query mutation to post data
      const response = await printSchedule({
        weekType: "currentWeek",
      }).unwrap();
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error(
        "Error Details:",
        error.response ? error.response.data : error
      );
    }
  };

  const handlePrintNextWeek = async () => {
    try {
      // Using RTK Query mutation to post data
      const response = await printSchedule({
        weekType: "nextWeek",
      }).unwrap();
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error(
        "Error Details:",
        error.response ? error.response.data : error
      );
    }
  };

  // Closing modal if email is sent successfully

  useEffect(() => {
    if (isSuccess) {
      alert("Email sent successfully");
      dispatch(closeModal());
    }
  }, [isSuccess, dispatch]);

  // Displaying a loading indicator while the delete request is in progress

  if (isLoading) {
    return <IsLoading />;
  }

  // // Displaying an error message if the delete request fails
  if (isError) {
    let errorMessage = "You are not authorized to perform this action";
    if (error.status === 403) {
      errorMessage =
        "Access Denied: You do not have permission to perform this action.";
    }
    return <IsError error={errorMessage} />;
  }

  // Main modal content for deletion confirmation
  return (
    <div className={styles.modalContent}>
      <div className={styles.formGroup}>
        <h2>Print:</h2>
      </div>
      <div className={styles.formGroup}>
        {/* Delete and Go Back buttons */}
        <GenericButton onClick={handlePrintCurrentWeek}>
          CURRENT WEEK
        </GenericButton>
        <GenericButton onClick={handlePrintNextWeek}>NEXT WEEK</GenericButton>
      </div>
    </div>
  );
};
