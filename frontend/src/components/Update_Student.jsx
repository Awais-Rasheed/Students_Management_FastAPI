// src/components/UpdateStudentModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { updateStudent } from "../services/studentService";

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

function Update_Student({ open, handleClose, student, fetchStudent }) {
  const [updated_name, setUpdatedName] = useState("");
  const [updated_roll_no, setUpdatedRollNo] = useState("");
  const [updated_address, setUpdatedAddress] = useState("");

  useEffect(() => {
    if (student) {
      setUpdatedName(student.name);
      setUpdatedRollNo(student.roll_no);
      setUpdatedAddress(student.address);
    }
  }, [student]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(student.roll_no, {
        updated_name,
        updated_roll_no: Number(updated_roll_no),
        updated_address,
      });
      toast.success("✅ Student Updated Successfully!");
      fetchStudent();
      handleClose();
    } catch (error) {
      toast.error("❌ Failed to update student!");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h4" mb={2} sx={{ textAlign: "center" }}>
          Update Student
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={updated_name}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <TextField
            label="Roll No"
            type="number"
            fullWidth
            margin="dense"
            value={updated_roll_no}
            onChange={(e) => setUpdatedRollNo(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="dense"
            value={updated_address}
            onChange={(e) => setUpdatedAddress(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Update Student
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default Update_Student;
