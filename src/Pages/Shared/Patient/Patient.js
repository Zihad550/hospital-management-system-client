import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Patient = ({ patient }) => {
  const { name, email, image, category, cost, personId } = patient;
  return (
    <Grid item md={4} lg={3} xs={12} sm={6}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          width="200px"
          height="300px"
          image={`data:image/png;base64,${image}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Patient name: {name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            Contact: {email}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            Category: <span style={{ color: "blue" }}>{category}</span>
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography gutterBottom variant="subtitle1" component="div">
              Operation Cost: {cost} $
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              Patient Id: <span style={{ color: "violet" }}>{personId}</span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Patient;
