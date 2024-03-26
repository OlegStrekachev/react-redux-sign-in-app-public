import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux-slices/authSlice";
import { useValidateTokenQuery } from "../redux-slices/sliceApi";
import { useNavigate, useLocation } from "react-router-dom";


// This hook manages automatic redirection to the auth page if the user is not authenticated

export const useTokenValidate = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRedirected = useSelector((state) => state.auth.setRedirected);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Use the query hook with forceRefetch option
  const { isSuccess} = useValidateTokenQuery();

  useEffect(() => {
    const currentPath = location.pathname;
    // Call refetch to ensure the latest data is fetched
    console.log("Refetching")

    console.log("isSuccess: ", isSuccess, "isAuthenticated: ", isAuthenticated  )

    if (isSuccess && !isAuthenticated && !isRedirected) {
      dispatch(login());
      console.log("Logged in from validate token");
      if (currentPath === "/auth") {
        navigate("/table");
      }
    } else if (!isSuccess && !isRedirected) {
      dispatch(logout());
      console.log("User is not authenticated");
      if (currentPath !== "/auth") {
        navigate("/auth");
      }
    }
  }, [isSuccess, dispatch, navigate, location.pathname, isAuthenticated, isRedirected]);

  // Optionally, you can return something from this hook if needed
};
