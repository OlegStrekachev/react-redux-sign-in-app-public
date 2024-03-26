import React from "react";
import ReactDOM from "react-dom/client";
import { RouteProvider } from "./route-provider/RouteProvider.jsx";

// Global CSS styles
import "./styles/resetstyle.css"; // CSS Reset to maintain styling consistency
import "./styles/responsiveSystem.css"; // CSS for responsive design

import { store } from "./redux-store/store.js"; // Importing the configured Redux store
import { Provider } from "react-redux"; // Redux Provider for state management

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping entire app in the Redux Provider to make the store accessible throughout the app
  <Provider store={store}>
    {/* RouteProvider wraps the app with React Router context for routing functionality */}
    <RouteProvider>
      {/* No main App Component - everything is rendered through the RouterProvider */}
    </RouteProvider>
  </Provider>
);
