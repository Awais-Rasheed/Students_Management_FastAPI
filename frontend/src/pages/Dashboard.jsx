import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Box
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { toast } from "react-toastify";
import Add_Student from "../components/Add_Student";
import Update_Student from "../components/Update_Student";
import { getAllStudents, deleteStudent } from "../services/studentService";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  }));

  const handleDelete = (roll_no) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this student?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={async () => {
              try {
                await deleteStudent(roll_no);
                toast.dismiss();
                toast.success("🗑️ Student Deleted Successfully!");
                fetchStudent();
              } catch {
                toast.dismiss();
                toast.error("❌ Failed to delete student!");
              }
            }}
          >
            Yes
          </Button>
          <Button variant="outlined" color="inherit" size="small" onClick={() => toast.dismiss()}>
            No
          </Button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "60%", margin: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ margin: "20px" }}
            onClick={() => setOpenAdd(true)}
          >
            Add New Student
          </Button>
        </Box>
        <Table sx={{ maxWidth: "80%", margin: "auto" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Roll No</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((std) => (
              <StyledTableRow key={std.id}>
                <StyledTableCell>{std.name}</StyledTableCell>
                <StyledTableCell align="center">{std.roll_no}</StyledTableCell>
                <StyledTableCell align="center">{std.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: "5px" }}
                    onClick={() => {
                      setSelectedStudent(std);
                      setOpenUpdate(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ margin: "5px" }}
                    onClick={() => handleDelete(std.roll_no)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Add_Student open={openAdd} handleClose={() => setOpenAdd(false)} fetchStudent={fetchStudent} />
      <Update_Student
        open={openUpdate}
        handleClose={() => setOpenUpdate(false)}
        student={selectedStudent}
        fetchStudent={fetchStudent}
      />
    </>
  );
}

export default Dashboard;
