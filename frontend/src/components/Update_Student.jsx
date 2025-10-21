import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";

function UpdateStudent() {
  const { roll_no } = useParams();
  const [updated_name, setUpdatedName] = useState("");
  const [updated_roll_no, setUpdatedRollNo] = useState("");
  const [updated_address, setUpdatedAddress] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!updated_name || !updated_roll_no || !updated_address) {
      toast.warning("⚠️ Please fill all fields before submitting");
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/update-student/${roll_no}`, null, {
        params: {
          updated_name,
          updated_roll_no: Number(updated_roll_no),
          updated_address,
        },
      });

      toast.success("✅ Student Updated Successfully!");
      setUpdatedName("");
      setUpdatedRollNo("");
      setUpdatedAddress("");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update student!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "400px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          ✏️ Update Student (Roll No: {roll_no})
        </Typography>

        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            label="New Name"
            variant="outlined"
            value={updated_name}
            onChange={(e) => setUpdatedName(e.target.value)}
            fullWidth
          />

          <TextField
            label="New Roll No"
            type="number"
            variant="outlined"
            value={updated_roll_no}
            onChange={(e) => setUpdatedRollNo(e.target.value)}
            fullWidth
          />

          <TextField
            label="New Address"
            variant="outlined"
            value={updated_address}
            onChange={(e) => setUpdatedAddress(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Student
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default UpdateStudent;
