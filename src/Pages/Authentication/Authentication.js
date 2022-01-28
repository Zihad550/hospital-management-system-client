import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  console.log(user);

  const id = JSON.parse(localStorage.getItem("id"));
  const role = JSON.parse(localStorage.getItem("role"));
  //
  const handleVerify = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8000/users?id=${data?.personId}&&role=${data?.role}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
        console.log(data[0]);
        localStorage.setItem("id", JSON.stringify(data[0].personId));
        localStorage.setItem("role", JSON.stringify(data[0].role));
        data[0].role === "admin" && navigate("/adminDashboard");
        data[0].role === "staff" && navigate(`/staffDashboard`);
        data[0].role === "doctor" && navigate("/doctorDashboard");
        setUser(data[0]);
      });
  };

  const handleVerifyData = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...data };
    newValue[field] = value;
    setData(newValue);
  };

  // check if the user is already logged previously

  useEffect(() => {
    if (id && role) {
      fetch(`http://localhost:8000/users?id=${id}&&role=${role}`)
        .then((res) => res.json())
        .then((data) => {
          data[0].role === "admin" && navigate("/adminDashboard");
          data[0].role === "staff" && navigate(`/staffDashboard`);
          data[0].role === "doctor" && navigate("/doctorDashboard");
          setUser(data[0]);
          console.log(data[0]);
        });
    }
  }, [navigate]);

  const options = [
    { value: "doctor", label: "Doctor" },
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];
  return (
    <>
      <Box sx={{ mx: 2 }}>
        <Typography sx={{ my: 4 }} variant="h3">
          Please Verify yourself
        </Typography>
        <form onSubmit={handleVerify}>
          <TextField
            margin="dense"
            onChange={handleVerifyData}
            fullWidth
            type="number"
            label="Personal Id"
            name="personId"
            required
          />
          <TextField
            select
            label="Select role"
            onChange={handleVerifyData}
            helperText="Please select your currency"
            name="role"
            defaultValue="Staff"
            fullWidth
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" fullWidth>
            Verify
          </Button>
        </form>
      </Box>
      {user?.role === "admin" && navigate("/adminDashboard")}
      {user?.role === "staff" && navigate(`/staffDashboard`)}
      {user?.role === "doctor" && navigate("/doctorDashboard")}
    </>
  );
};

export default Authentication;
