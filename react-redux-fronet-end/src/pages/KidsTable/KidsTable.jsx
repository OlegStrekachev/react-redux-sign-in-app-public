import styles from "./KidsTable.module.css";
import PropTypes from "prop-types";

import { kidsListApi } from "../../redux-slices/sliceApi";

import { useDispatch } from "react-redux";
import { openModal } from "../../redux-slices/modalSlice";

import GenericButton from "../../components/generics/GenericButton";
import { useNavigate } from "react-router-dom";

import { useLogoutUserMutation } from "../../redux-slices/sliceApi";

import { logout, setRedirected } from "../../redux-slices/authSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useRef } from "react";
import { useEffect } from "react";

export const KidsTable = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tableWrapperRef = useRef(null);
  const modalState = useSelector((state) => state.modals.currentModal);

  const [logoutUser, { isLoading: isError }] = useLogoutUserMutation();

  const handleLogout = async () => {
    logoutUser();
    dispatch(logout());
    dispatch(kidsListApi.util.resetApiState());

    navigate("/auth");
    console.log("Redirected to /auth");
    dispatch(setRedirected(true));
    console.log("logout");
  };

  const hanflePrintClick = () => {
    dispatch(openModal({ modalType: "printingOptions" }));
  };

  const handleCreateNewRecord = () => {
    dispatch(openModal({ modalType: "createNewRecord" }));
  };

  return (
    <div ref={tableWrapperRef} className={styles.tableWrapper}>
      <div className={styles.flexContainer}>
        <div className={styles.flexItem}>
          <GenericButton onClick={handleCreateNewRecord}>NEW +</GenericButton>
        </div>
        <div className={styles.flexItem}>
          <h5>Name</h5>
        </div>
        <div className={styles.flexItem}>
          <h5>Age</h5>
        </div>
        <div className={styles.flexItem}>
          <h5>Days</h5>
        </div>
        <div className={styles.flexItem}>
          <GenericButton onClick={hanflePrintClick}>PRINT</GenericButton>
        </div>
        <div className={styles.flexItem}>
          <GenericButton onClick={handleLogout}>LOGOUT</GenericButton>
        </div>
      </div>

      {children}
    </div>
  );
};

KidsTable.propTypes = {
  children: PropTypes.node.isRequired,
};
