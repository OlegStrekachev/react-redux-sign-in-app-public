// Importing React, Redux, and RTK Query hooks and components
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { usePostNewRecordMutation } from "../../../redux-slices/sliceApi";
import { closeModal } from "../../../redux-slices/modalSlice";
import GenericButton from "../../../components/generics/GenericButton";
import { IsLoading } from "../../../components/lifecycle/IsLoading";
import { IsError } from "../../../components/lifecycle/IsError";
import styles from "./ModalCreateNewRecord.module.css";
import { handleNumberInput } from "../../../utils/handleNumericInputOnly";

// Component for creating a new record
export const ModalCreateNewRecord = () => {
  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // Local state for error handling
  const [localError, setLocalError] = useState("");

  // Mutation hook from RTK Query for posting a new record
  const [postNewRecord, { isLoading, isSuccess, isError, error }] =
    usePostNewRecordMutation();

  // Refs for form inputs
  const childNameRef = useRef(null);
  const childAgeRef = useRef(null);
  const childDaysRef = useRef(null);

  // Array of days for the form
  const days = ["Mo", "Tu", "We", "Th", "Fr"]; // Moved outside the component

  // Function to handle form submission
  const handleSubmit = async () => {
    // Gathering data from form fields
    const checkedDays = Array.from(
      childDaysRef.current.querySelectorAll('input[type="checkbox"]:checked')
    ).map((input) => input.value);

    const payload = {
      name: childNameRef.current.value,
      age: childAgeRef.current.value,
      days: checkedDays,
    };

    // Validate input synchronously and abort execution if empty
    if (!payload.name) {
      setLocalError("Name cannot be empty");
      childNameRef.current.focus();
      return;
    }
    if (!payload.age) {
      setLocalError("Age cannot be empty");
      childAgeRef.current.focus();
      return;
    }

    try {
      // Using RTK Query mutation to post data
      const response = await postNewRecord(payload).unwrap();
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error("Form submission failed", error);
    }
  };

  // Closing modal if submission is successful

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal());
    }
  }, [isSuccess, dispatch]);

  // Rendering loading component if mutation is in progress
  if (isLoading) {
    return <IsLoading />;
  }

  // Rendering error component if mutation fails
  if (isError) {
    return <IsError error={error} />;
  }

  // Main form rendering
  return (
    <div className={styles.modalContent}>
      <div className={styles.formGroup}>
        <h3>Create New Record</h3>
      </div>
      {/* Form fields for name, age, and days */}
      <div className={styles.formGroup}>
        <label htmlFor="name">
          <h5>Name:</h5>
        </label>
        <input
          type="text"
          className={styles.formControl}
          id="name"
          placeholder="Name"
          ref={childNameRef}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="age">
          <h5>Age:</h5>
        </label>
        <input
          onKeyDown={handleNumberInput}
          type="number"
          pattern="[0-9]*"
          className={styles.formControl}
          id="age"
          placeholder="Age"
          ref={childAgeRef}
          required
        />
      </div>
      {localError && <div className={styles.formGroup}>{localError}</div>}
      <div className={styles.formGroup}>
        <label htmlFor="days">
          <h5>Days:</h5>
        </label>
        <div className={styles.daysContainer} ref={childDaysRef}>
          {days.map((day) => (
            <div className={styles.daysCellContainer} key={day}>
              <input type="checkbox" id={day} name={day} value={day} />
              <label htmlFor={day}>{day}</label>
            </div>
          ))}
        </div>
      </div>
      {/* Submit button for the form */}
      <div className={styles.formGroup}>
        <GenericButton onClick={handleSubmit}>SUBMIT</GenericButton>
      </div>
    </div>
  );
};
