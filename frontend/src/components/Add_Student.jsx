// src/components/AddStudentModal.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { addStudent } from "../services/studentService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function Add_Student({ open, handleClose, fetchStudent }) {
  const [name, setName] = useState("");
  const [roll_no, setRollNo] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent({ name, roll_no: Number(roll_no), address });
      toast.success("✅ Student Added Successfully!");
      fetchStudent();
      handleClose();
    } catch (error) {
      toast.error("❌ Failed to add student!");
    }
  };

  useEffect(() => {
  if (!open) {
    setName("");
    setRollNo("");
    setAddress("");
  }
}, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h4" mb={2} sx={{textAlign:'center'}}>Add New Student</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Roll No"
            type="number"
            fullWidth
            margin="dense"
            value={roll_no}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="dense"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Add Student
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default Add_Student;
