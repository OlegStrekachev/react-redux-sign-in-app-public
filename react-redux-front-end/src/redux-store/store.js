// ConfigureStore is a part of Redux Toolkit, which is a wrapper around Redux that makes it easier to use
import { configureStore } from "@reduxjs/toolkit";

// setupListeners is an RTK Query function that adds listeners to the store to handle API calls
import { setupListeners } from "@reduxjs/toolkit/query";

// Importing slices responsible for different logical parts of the app

// RTK Query api slice that handles all the API calls for the entire app
import { kidsListApi } from "../redux-slices/sliceApi";

// modalSlice is a slice that handles all the modals
import { modalSlice } from "../redux-slices/modalSlice";

// authSlice is a slice that handles all the authentication logic
import { authSlice } from "../redux-slices/authSlice";

export const store = configureStore({
  // Combining all the reducers into one object that will be passed to the store
  reducer: {
    modals: modalSlice.reducer,
    auth: authSlice.reducer,
    // Add the RTK Query generated reducer as a part of the store
    [kidsListApi.reducerPath]: kidsListApi.reducer,
  },
  // Adding the middleware to the store to handle API calls
  // Callback function that returns an array of middleware and adds the API middleware to it
  middleware: (getDefaultMiddleware) =>
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    getDefaultMiddleware().concat(kidsListApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
