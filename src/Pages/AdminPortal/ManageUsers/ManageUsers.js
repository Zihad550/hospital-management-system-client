import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { Card, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManageUser from "../ManageUser/ManageUser";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  let role;
  if (location.pathname === "/adminDashboard/manageAdmins") {
    role = "admin";
    console.log("inside");
  } else if (location.pathname === "/adminDashboard/manageStaffs") {
    role = "staff";
  } else {
    role = "doctor";
  }

  const id = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    setRefresh(false);
    console.log("effect");
    fetch(`https://shielded-meadow-04426.herokuapp.com/users?role=${role}`)
      .then((res) => res.json())
      .then((data) => {
        if (role === "admin") {
          const users = data.filter((d) => d.personId !== id);
          setUsers(users);
        } else {
          setUsers(data);
        }
      });
  }, [role, refresh]);
  return (
    <Container>
      <Grid container spacing={{ md: 2, xs: 1 }}>
        <Grid item md={4} lg={3} xs={12} sm={6}>
          <Card
            className="primary-hover"
            sx={{ p: 5, cursor: "pointer" }}
            onClick={() => {
              (role === "admin" && navigate("/adminDashboard/addAdmin")) ||
                (role === "doctor" && navigate("/adminDashboard/addDoctor")) ||
                (role === "staff" && navigate("/adminDashboard/addStaff"));
            }}
          >
            <PersonAddAltRoundedIcon sx={{ width: "100%", height: "auto" }} />
            <Typography sx={{ textTransform: "uppercase" }} variant="h6">
              Add New {role}
            </Typography>
          </Card>
        </Grid>
        {users.map((user) => (
          <ManageUser user={user} key={user._id} setRefresh={setRefresh} />
        ))}
      </Grid>
    </Container>
  );
};

export default ManageUsers;
