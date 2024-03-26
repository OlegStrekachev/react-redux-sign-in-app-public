import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useValidateTokenQuery } from "../redux-slices/sliceApi";
import { setRedirected } from "../redux-slices/authSlice"; // Assuming you have this action

export const useAuthStatusRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRedirected = useSelector((state) => state.auth.setRedirected);

  useEffect(() => {
    const currentPath = location.pathname;

    if (isAuthenticated && currentPath !== "/auth") {
      console.log("Redirecting to table");
      dispatch(setRedirected(true));
    } else if (!isAuthenticated && currentPath !== "/auth") {
      console.log("Redirecting to auth");
      dispatch(setRedirected(true));
    }
  }, [
    dispatch,
    isAuthenticated,
    location.pathname,
    isRedirected,
    navigate,
  ]);
};
