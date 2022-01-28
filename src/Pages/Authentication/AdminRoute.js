import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const [user, setUser] = useState();

  /* useEffect(() => {
    fetch(`http://localhost:8000/doctors`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []); */

  const location = useLocation();

  if (user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/authentication" state={{ from: location }} />;
  }
};

export default AdminRoute;
