import { Button, Input, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, user, setRefresh }) {
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    if (id && id.length < 6) {
      return alert("Admin Id must be of greater then 6 characters");
    }
    name || setName(user.name);
    email || setEmail(user.email);
    id || setId(user.personId);
    image || setImage(user.image);
    role || setRole(user.role);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("role", role);
    formData.append("personId", id);

    fetch(`https://shielded-meadow-04426.herokuapp.com/users?id=${user._id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.error && alert(data.error);
        if (data.modifiedCount) {
          alert("Updated successfully");
          handleClose();
          setRefresh(true);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const roles = [
    { value: "doctor", label: "Doctor" },
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          sx={{ mb: 2 }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Update {user.name} information
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="New Name"
          />
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="New Email"
            margin="dense"
          />
          <TextField
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="number"
            label="New Id"
            margin="dense"
          />

          <TextField
            select
            label="Select role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            helperText="Select new role"
            name="role"
            defaultValue="Staff"
            fullWidth
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Input
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            type="file"
            sx={{ my: 2 }}
          />

          <Button type="submit" variant="contained">
            Update {user.role}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
