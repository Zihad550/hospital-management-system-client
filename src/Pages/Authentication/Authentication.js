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
      `https://shielded-meadow-04426.herokuapp.com/users/user?id=${data?.personId}&&role=${data?.role}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem("id", JSON.stringify(data.personId));
        localStorage.setItem("role", JSON.stringify(data.role));
        data.role === "admin" && navigate("/adminDashboard");
        data.role === "staff" && navigate(`/staffDashboard`);
        data.role === "doctor" && navigate("/doctorDashboard");
        setUser(data);
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
      fetch(
        `https://shielded-meadow-04426.herokuapp.com/users/user?id=${id}&&role=${role}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.role === "admin" && navigate("/adminDashboard");
          data.role === "staff" && navigate(`/staffDashboard`);
          data.role === "doctor" && navigate("/doctorDashboard");
          setUser(data);
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
            helperText="Please select your Role"
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
