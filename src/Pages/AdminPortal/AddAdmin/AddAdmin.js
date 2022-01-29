import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const AddAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  console.log(name, email);

  const addAdmin = (e) => {
    e.preventDefault();
    if (!image && name && email) {
      return;
    }
    if (id.length < 6) {
      return alert("Admin Id must be of greater then 6 characters");
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("role", "admin");
    formData.append("personId", id);

    fetch("http://localhost:8000/users", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        data.error && alert(data.error);
        if (data.insertedId) {
          setName("");
          setEmail("");
          setId("");
          alert("Admin added successfully");
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  return (
    <Box sx={{ mx: 2 }}>
      <Typography sx={{ my: 3 }} variant="h2">
        Add New Admin
      </Typography>
      <form onSubmit={addAdmin}>
        <TextField
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Admin Name"
        />
        <TextField
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Admin Email"
          margin="dense"
        />
        <TextField
          fullWidth
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="number"
          label="Admin Id"
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
          Add Admin
        </Button>
      </form>
    </Box>
  );
};

export default AddAdmin;
