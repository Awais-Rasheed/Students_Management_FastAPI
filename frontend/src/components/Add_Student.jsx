import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    roll_no: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/add-student", formData);
      toast.success("Student added successfully!");
      setFormData({ name: "", roll_no: "", address: "" });
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "400px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add New Student
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Student Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Roll Number"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Student
          </Button> 
        </form>
      </Paper>
    </Box>
  );
};

export default AddStudent;
