import PropTypes from "prop-types";
import styles from "./GenericButton.module.css";

export const GenericButton = ({ children, ...props }) => {
  return (
    <button className={styles.genericButton} {...props}>
      {children}
    </button>
  );
};

GenericButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default GenericButton;
