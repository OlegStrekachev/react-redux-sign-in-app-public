// Importing necessary React and Redux hooks, components, and styles
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteRecordMutation } from "../../../redux-slices/sliceApi";
import { closeModal } from "../../../redux-slices/modalSlice";
import GenericButton from "../../../components/generics/GenericButton";
import { IsLoading } from "../../../components/lifecycle/IsLoading";
import { IsError } from "../../../components/lifecycle/IsError";
import styles from "./ModalDeleteRecord.module.css";

// Component for deleting a specific record
export const ModalDeleteRecord = () => {
  // Initializing Redux dispatch function
  const dispatch = useDispatch();

  // Mutation hook from RTK Query for deleting a record
  const [deleteRecord, { isLoading, isSuccess, isError, error }] =
    useDeleteRecordMutation();

  // Retrieving the name and ID of the current record from the Redux store
  const currentChild = useSelector((state) => state.modals.itemName);
  const payload = useSelector((state) => state.modals.itemId);

  // Function to close the modal
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  // Function to handle record deletion
  const handleDelete = async () => {
    try {
      const response = await deleteRecord(payload).unwrap();
      console.log("Record deleted successfully", response);
    } catch (error) {
      console.error("Failed to delete the record", error);
    }
  };

  // Closing modal if deletion is successful

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal());
    }
  }, [isSuccess, dispatch]);

  // Displaying a loading indicator while the delete request is in progress
  if (isLoading) {
    return <IsLoading />;
  }

  // Displaying an error message if the delete request fails
  if (isError) {
    return <IsError error={error} />;
  }

  // Main modal content for deletion confirmation
  return (
    <div className={styles.modalContent}>
      <div className={styles.formGroup}>
        <h2>You are deleting a record.</h2>
      </div>
      <div className={styles.formGroup}>
        <h5>{currentChild}</h5> {/* Displaying the name of the record */}
      </div>
      <div className={styles.formGroup}>
        {/* Delete and Go Back buttons */}
        <GenericButton onClick={handleDelete}>DELETE</GenericButton>
        <GenericButton onClick={handleCloseModal}>GO BACK</GenericButton>
      </div>
    </div>
  );
};
