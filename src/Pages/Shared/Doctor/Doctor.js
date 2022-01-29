import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

const Doctor = ({ doctor }) => {
  const { name, email, image } = doctor;
  return (
    <Grid item md={4} lg={3} xs={12} sm={6}>
      <Card>
        <CardMedia
          component="img"
          width="100%"
          height="300px"
          image={`data:image/png;base64,${image}`}
          alt="green iguana"
        />
        <CardContent sx={{ textAlign: "center", mx: "auto" }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {email}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Doctor;
