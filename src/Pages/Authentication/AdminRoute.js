import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const [user, setUser] = useState();

  const location = useLocation();

  if (user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/authentication" state={{ from: location }} />;
  }
};

export default AdminRoute;
