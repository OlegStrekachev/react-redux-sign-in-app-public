import { createSlice } from "@reduxjs/toolkit";

// This is the initial state of the slice

const initialState = {
  isAuthenticated: undefined,
  isRedirected: false,
  tokenLifetime: undefined,
  // ... other state properties if needed
};

// This slice handles authentication status of the user and provides actions to change it
export const authSlice = createSlice({
  // Name field is used to generate action types
  name: "auth",
  initialState,
  // Reducers are functions that handle actions
  reducers: {
    logout: (state) => {
      // Immer library allows us to write code that looks like mutating the state, but actually creates a new state object
      // Removing token expiration timestamp from local storage
      localStorage.removeItem("tokenExpirationTimestamp");
      state.isAuthenticated = false;
      state.tokenLifetime = null;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.tokenLifetime = action.payload;
    },
    setRedirected: (state, action) => {
      state.isRedirected = action.payload;
    },
    setTokenLifetime: (state, action) => {
      state.tokenLifetime = action.payload;
    },
    // ... additional reducers if needed
  },
  // ... extraReducers if needed for handling async thunks
});

// Exporting actions to be used in components
export const { logout, login, setRedirected, setTokenLifetime } =
  authSlice.actions;
