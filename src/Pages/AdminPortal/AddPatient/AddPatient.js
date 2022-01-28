import {
  Box,
  Button,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AddPatient = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const { name, email, category, cost, id } = data;

  console.log(data);

  const handlePatientData = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...data };
    newValue[field] = value;
    setData(newValue);
  };

  const addPatient = (e) => {
    e.preventDefault();
    if (!image && data) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("category", category);
    formData.append("cost", cost);
    formData.append("image", image);
    formData.append("personId", id);

    fetch("http://localhost:8000/patients", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        data.error && alert(data.error);
        if (data.insertedId) {
          alert("Patient addeded successfully");
          setData({ name: "", email: "", category: "", id: "", cost: "" });
          setImage(null);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const categories = [
    { value: 1, label: "Chemotherapy or other drug therapies" },
    { value: 2, label: "Radiation therapy" },
    { value: 3, label: "Immunotherapy" },
    { value: 4, label: "Vaccine therapy" },
    { value: 5, label: "Stem cell transplantation" },
    { value: 6, label: "Blood transfusion" },
    { value: 7, label: "Palliative care" },
    { value: 8, label: "Clinical trials " },
    { value: 9, label: "Dental" },
    { value: 0, label: "Eye Care" },
  ];
  return (
    <Box sx={{ mx: 2 }}>
      <Typography sx={{ my: 3 }} variant="h2">
        Add a Patient
      </Typography>
      <form onSubmit={addPatient}>
        <TextField
          fullWidth
          required
          value={name}
          onChange={handlePatientData}
          label="Patient Name"
          name="name"
        />
        <TextField
          fullWidth
          required
          value={email}
          onChange={handlePatientData}
          type="email"
          label="Patient Email"
          margin="dense"
          name="email"
        />

        {/* patient category */}
        <TextField
          id="outlined-select-currency"
          select
          value={category}
          label="Patient Category"
          name="category"
          // value={data.category}
          onChange={handlePatientData}
          margin="dense"
          fullWidth
          required
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          required
          value={cost}
          onChange={handlePatientData}
          type="number"
          label="Cost"
          margin="dense"
          name="cost"
        />
        <TextField
          fullWidth
          required
          value={id}
          onChange={handlePatientData}
          type="number"
          label="Patient Id"
          margin="dense"
          name="id"
        />

        <Input
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          type="file"
          sx={{ my: 2 }}
        />
        <Button type="submit" variant="contained">
          Add Patient
        </Button>
      </form>
    </Box>
  );
};

export default AddPatient;
