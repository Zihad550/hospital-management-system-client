import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  console.log(name, email);

  const addStaff = (e) => {
    e.preventDefault();
    if (!image && name && email) {
      return;
    }
    if (id.length < 6) {
      return alert("Doctor Id must be of greater then 6 characters");
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("role", "doctor");
    formData.append("personId", id);

    fetch("http://localhost:8000/users", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setName("");
          setEmail("");
          setId("");
          alert("Doctor added successfully");
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  return (
    <Box sx={{ mx: 2 }}>
      <Typography sx={{ my: 3 }} variant="h2">
        Add a Doctor
      </Typography>
      <form onSubmit={addStaff}>
        <TextField
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Doctor Name"
        />
        <TextField
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Doctor Email"
          margin="dense"
        />
        <TextField
          fullWidth
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="number"
          label="Doctor Id"
          margin="dense"
        />

        <Input
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          type="file"
          sx={{ my: 2 }}
        />

        <Button type="submit" variant="contained">
          Add doctor
        </Button>
      </form>
    </Box>
  );
};

export default AddDoctor;
