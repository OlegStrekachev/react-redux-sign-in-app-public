import styles from "./Login.module.css";

// React hooks
import { useRef, useState } from "react";

// React Router hooks
import { useNavigate } from "react-router-dom";

// Redux hooks
import { useDispatch } from "react-redux";

// apiSlice hooks
import { useLoginUserMutation } from "../../redux-slices/sliceApi";

// Key press handler hook
import { useHandleKeyPress } from "../../custom-hooks/handleKeyPress";

// authSlice actions
import { login } from "../../redux-slices/authSlice";

// Components
import { IsLoading } from "../../components/lifecycle/IsLoading";
import GenericButton from "../../components/generics/GenericButton";

// Login component

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Local state for error handling
  const [localError, setLocalError] = useState("");
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // LoginUserMutation hook from apiSlice
  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Gathering the input values from the form
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Defining the login attempt handler

  const handleLoginAttempt = async () => {
    // Get the input values from the form on submit
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    // Reset error state at the beginning of the attempt
    setLocalError("");

    // Validate input synchronously and abort execution if empty
    if (!username) {
      setLocalError("Username cannot be empty");
      usernameInputRef.current.focus();
      return;
    }
    if (!password) {
      setLocalError("Password cannot be empty");
      passwordInputRef.current.focus();
      return;
    }

    // Attempt to login with the credentials
    try {
      const result = await loginUser({ username, password }).unwrap();
      // extracting the token expiration interval from the response
      const tokenExpirationInterval = result.tokenExpiration;
      // Calculating the token expiration timestamp
      const tokenExpirationTimestamp =
        new Date().getTime() + tokenExpirationInterval;
      // Storing the token in the local storage
      localStorage.setItem(
        "tokenExpirationTimestamp",
        tokenExpirationTimestamp
      );
      // Dispatching the login action with the token expiration interval
      dispatch(login(tokenExpirationInterval));

      // Redirect to the table page on successful login
      navigate("/table");
    } catch (error) {
      setLocalError(error.data.error);
    }
  };

  // useEffect for handling "Enter" key press
  // functional expressions are not hoisted therefore the function must be defined before the useEffect hook
  // Function should be passed as a reference to the useEffect hook and not invoked directly
  useHandleKeyPress(handleLoginAttempt, "Enter");

  // Render
  return (
    <>
      {isLoading && <IsLoading />}

      <div className={styles.contentWrapper}>
        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <h3>Enter credentials</h3>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Username">
              <h5>Username: "user"</h5>
            </label>
            <input
              type="text"
              className={styles.formControl}
              id="Username"
              required
              ref={usernameInputRef}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Password">
              <h5>Password: "user"</h5>
            </label>
            <div className={styles.passwordContainer}>
              <input
                // Conditionally render the input type based on the showPassword state
                type={showPassword ? "text" : "password"}
                className={styles.formControl}
                id="Password"
                required
                ref={passwordInputRef}
              />
              <button
                // Controlling password visibility with the showPassword state
                onClick={() => setShowPassword(!showPassword)}
                className={`${styles.passwordToggle} ${
                  showPassword
                    ? styles.hidePasswordIcon
                    : styles.showPasswordIcon
                }`}
                aria-label="Toggle password visibility"
              />
            </div>
          </div>
          <div>{localError && <div>{localError}</div>}</div>
          <div className={styles.formGroup}>
            <GenericButton
              onClick={() => {
                handleLoginAttempt();
              }}
            >
              SUBMIT
            </GenericButton>
          </div>
        </div>
      </div>
    </>
  );
};
