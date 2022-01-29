import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const AdminHome = () => {
  const [admins, setAdmins] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState(0);
  const [members, setMembers] = useState(0);

  const peoples = [
    { id: 1, total: admins.length, name: "Admins" },
    { id: 2, total: staffs.length, name: "Staffs" },
    { id: 3, total: doctors.length, name: "Doctors" },
    { id: 4, total: patients, name: "Patients" },
    { id: 5, total: members, name: "Members" },
  ];
  console.log(admins, staffs, doctors, patients, members);
  useEffect(() => {
    fetch(`https://shielded-meadow-04426.herokuapp.com/allUser`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.length);
        setAdmins(data.filter((d) => d.role === "admin"));
        setDoctors(data.filter((d) => d.role === "doctor"));
        setStaffs(data.filter((d) => d.role === "staff"));
      });

    fetch(`https://shielded-meadow-04426.herokuapp.com/patients`)
      .then((res) => res.json())
      .then((data) => setPatients(data.length));
  }, []);

  return (
    <div>
      <Typography
        textAlign="center"
        gutterBottom
        sx={{ borderBottom: "1px solid black" }}
        variant="h2"
      >
        Organization Status
      </Typography>
      <Grid container spacing={{ md: 2, xs: 1 }}>
        {peoples.map((people) => (
          <Grid
            key={people.id}
            item
            lg={3}
            md={4}
            xs={12}
            sx={{ textAlign: "center" }}
          >
            <Paper elevation={2} sx={{ p: 5, fontSize: 30 }}>
              {people.name === "Members"
                ? `Total ${people.name}`
                : `Number of ${people.name}`}
              <Typography
                sx={{
                  fontSize: 32,
                  color: "violet",
                  background: "antiquewhite",
                  px: 2,
                  py: 1,
                  borderRadius: "50%",
                }}
                component="span"
              >
                {people.total}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminHome;
