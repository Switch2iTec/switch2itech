import React, { createContext, useContext } from "react";

export const userContext = createContext();

export const ContextProvider = ({ children }) => {
  const role = 'admin'; 
  const authenticated = true;

  return (
    <userContext.Provider value={{ role, authenticated }}>
      {children}
    </userContext.Provider>
  );
};

export const RoleGuard = ({ children, allowedRoles, fallback = null }) => {
  const { role, authenticated } = useAuth();

  if (!authenticated || !allowedRoles.includes(role)) {
    return fallback;
  }

  return <>{children}</>;
};

export const useAuth = () => {
  const context = useContext(userContext);
  
  if (!context) {
    throw new Error("useAuth must be used within a ContextProvider");
  }
  
  return context;
};

export default ContextProvider;