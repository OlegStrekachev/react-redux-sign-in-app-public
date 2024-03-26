import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import { KidsTableWrapper } from "../pages/KidsTable/KidsTableWrapper";
import { ModalBlueprint } from "../pages/KidsTable/modals/ModalBlueprint";
import { Login } from "../pages/Login/Login";

// Components
import { AuthWrapper } from "../components/generics/AuthWrapper";

// React Router components
import { Navigate } from "react-router-dom";

// Define the routes for the application
const router = createBrowserRouter([
  {
    // Redirect from root path to '/auth'
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    // Login page, wrapped with AuthWrapper for authentication logic
    path: "/auth",
    element: (
      <AuthWrapper>
        <Login />
      </AuthWrapper>
    ),
  },
  {
    // Table page, also wrapped with AuthWrapper
    path: "/table",
    element: (
      <AuthWrapper>
        <KidsTableWrapper />
        <ModalBlueprint />
      </AuthWrapper>
    ),
  },
  // You can add more routes here as needed
]);

// RouteProvider component that provides the routing context
export const RouteProvider = () => {
  return <RouterProvider router={router} />;
};
