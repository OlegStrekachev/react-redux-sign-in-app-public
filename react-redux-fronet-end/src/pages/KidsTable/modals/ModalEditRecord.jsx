// Importing React, Redux, and RTK Query hooks and components
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditRecordMutation } from "../../../redux-slices/sliceApi";
import { closeModal } from "../../../redux-slices/modalSlice";
import GenericButton from "../../../components/generics/GenericButton";
import { IsLoading } from "../../../components/lifecycle/IsLoading";
import { IsError } from "../../../components/lifecycle/IsError";
import { handleNumberInput } from "../../../utils/handleNumericInputOnly";

import styles from "./ModalEditRecord.module.css";

// Component for editing an existing record

export const ModalEditRecord = () => {
  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // Mutation hook from RTK Query for posting a new record
  const [editRecord, { isLoading, isSuccess, isError, error }] =
    useEditRecordMutation();

  // Define refs for the form inputs
  const childNameRef = useRef(null);
  const childAgeRef = useRef(null);
  const childDaysRef = useRef(null);

  // Retrieving the current record from the Redux store
  const currentChildld = useSelector((state) => state.modals.itemId);
  const currentChildName = useSelector((state) => state.modals.itemName);
  const currentChildAge = useSelector((state) => state.modals.itemAge);
  const currentChildDays = useSelector((state) => state.modals.itemDays);

  // Local state for error handling
  const [localError, setLocalError] = useState("");

  // Array of days for the form
  const days = ["Mo", "Tu", "We", "Th", "Fr"];

  // Function to limit the input to numbers only
  // Look into react-forms for a better solution

  async function handleSubmit() {
    // Gathering data from form 'Days' fields
    const checkedDays = Array.from(
      childDaysRef.current.querySelectorAll('input[type="checkbox"]:checked')
    ).map((input) => input.value);

    // Defining the payload for the RTK Query mutation

    const payload = {
      id: currentChildld,
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
      //  Using RTK Query mutation to post data
      const response = await editRecord(payload).unwrap();
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error("Form submission failed", error);
    }
  }

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

  //Main form rendering

  return (
    <div className={styles.modalContent}>
      <div className={styles.formGroup}>
        <h3>Edit Existing Record</h3>
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
          aria-describedby="kidName"
          placeholder=""
          ref={childNameRef}
          defaultValue={currentChildName}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="age">
          <h5>Age:</h5>
        </label>
        <input
          onKeyDown={handleNumberInput}
          type="number"
          className={styles.formControl}
          id="age"
          aria-describedby="kidAge"
          placeholder="Age"
          ref={childAgeRef}
          defaultValue={currentChildAge}
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
              <input
                type="checkbox"
                defaultChecked={currentChildDays.includes(day)}
                id={day}
                name={day}
                value={day}
              />
              <label htmlFor={day}>{day}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.formGroup}>
        <GenericButton onClick={() => handleSubmit()}>SUBMIT</GenericButton>
      </div>
    </div>
  );
};
