import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Patient from "../Patient/Patient";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  console.log(patients);
  useEffect(() => {
    fetch("http://localhost:8000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);
  return (
    <Container>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {patients.map((patient) => (
          <Patient key={patient._id} patient={patient} />
        ))}
      </Grid>
    </Container>
  );
};

export default Patients;
