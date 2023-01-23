import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import Dashboard from "../pages/Dashboard";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    // return <Navigate to="/" />;
    <Dashboard />;
  }
  return children;
};

export default ProtectedRoute;
