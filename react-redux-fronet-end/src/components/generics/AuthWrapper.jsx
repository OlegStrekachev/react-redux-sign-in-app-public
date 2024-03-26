import { useTokenExpirationHandler } from "../../custom-hooks/tokenExpirationHandler";

export const AuthWrapper = ({ children }) => {
  useTokenExpirationHandler(); // This can now use `useNavigate`

  // ... other logic ...

  return <>{children}</>;
};
