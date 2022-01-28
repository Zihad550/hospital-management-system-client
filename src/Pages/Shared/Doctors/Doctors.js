import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Doctor from "../Doctor/Doctor";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);
  return (
    <Container>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {doctors.map((doctor) => (
          <Doctor key={doctor._id} doctor={doctor} />
        ))}
      </Grid>
    </Container>
  );
};

export default Doctors;
