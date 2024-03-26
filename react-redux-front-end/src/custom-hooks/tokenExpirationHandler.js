import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogoutUserMutation } from "../redux-slices/sliceApi";
import { logout } from "../redux-slices/authSlice";
import { kidsListApi } from "../redux-slices/sliceApi";

export const useTokenExpirationHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();
  const tokenExpirationTimestamp = localStorage.getItem(
    "tokenExpirationTimestamp"
  );

  useEffect(() => {
    if (tokenExpirationTimestamp) {
      const currentTime = new Date().getTime();
      const remainingTime = tokenExpirationTimestamp - currentTime;
      const humanReadableRemainingTime = Math.floor(remainingTime / 1000);

      if (remainingTime > 0) {
        // If there's still time left for the token navigate to the table page
        if (location.pathname === "/auth") {
          navigate("/table");
        }
        console.log("remainingTime", humanReadableRemainingTime);
        // And set a timer to logout the user when the token expires
        const timeoutId = setTimeout(() => {
          console.log("Token lifetime timer is up - logout");
          logoutUser()
            // RTK Query hoo returns a tuple. We use unwrap to get the promise instead of the tuple that resolve either into a value or an error
            .unwrap()
            .then(() => {
              dispatch(logout());
              dispatch(kidsListApi.util.resetApiState());
              if (location.pathname !== "/auth") {
                navigate("/auth");
              }
            });
        }, remainingTime);
        // Clear the timer after the component unmounts
        return () => clearTimeout(timeoutId);
        // If there's no time left for the token, logout the user
      } else {
        console.log("token is not recieved or expired");
        // And navigate to the login page if the user is not there already
        if (location.pathname !== "/auth") {
          navigate("/auth");
        }
      }
    }
    // If there's no tokenExpirationTimestamp, or it's in the past, do nothing
    // Token validation or refresh logic, if needed, should be handled elsewhere
  }, [
    dispatch,
    navigate,
    location.pathname,
    logoutUser,
    tokenExpirationTimestamp,
  ]);
};
