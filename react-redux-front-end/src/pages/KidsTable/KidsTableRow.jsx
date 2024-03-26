import PropTypes from "prop-types";
import styles from "./KidsTableRow.module.css";

// Redux imports
import { useDispatch } from "react-redux";
import { openModal } from "../../redux-slices/modalSlice";

// Generic button component import
import GenericButton from "../../components/generics/GenericButton";

// KidsTableRow component definition
export const KidsTableRow = ({ item, index }) => {
  const dispatch = useDispatch();

  // Function to handle the click event for deleting a record
  const handleDeleteRecordClick = () => {
    dispatch(
      openModal({
        modalType: "deleteRecord",
        itemId: item._id,
        itemName: item.name,
      })
    );
  };

  // Function to handle the click event for editing a record
  const handleEditRecordClick = () => {
    dispatch(
      openModal({
        modalType: "editRecord",
        itemId: item._id,
        itemName: item.name,
        itemDays: item.days,
        itemAge: item.age,
      })
    );
  };

  // Component render
  return (
    <>
      <div className={styles.flexContainer}>
        <div className={styles.flexItem}>{index + 1}</div>
        <div className={`${styles.flexItem} ${styles[item.color]}`}>
          {item.name}
        </div>
        <div className={styles.flexItem}>{item.age}</div>
        <div className={styles.flexItem}>
          {["Mo", "Tu", "We", "Th", "Fr"].map((day, idx) =>
            item.days.includes(day) ? (
              <span key={idx}>{day}</span>
            ) : (
              <span key={idx}>&times;</span>
            )
          )}
        </div>
        <div className={styles.flexItem}>
          <GenericButton onClick={handleEditRecordClick}>EDIT</GenericButton>
        </div>
        <div className={styles.flexItem}>
          <GenericButton onClick={handleDeleteRecordClick}>
            DELETE
          </GenericButton>
        </div>
      </div>
    </>
  );
};

// PropType validation for the KidsTableRow component
KidsTableRow.propTypes = {
  item: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    days: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
