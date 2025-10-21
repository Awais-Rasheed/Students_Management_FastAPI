import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Dashboard() {
  const [student, setStudent] = useState([]);
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleDelete = async (roll_no) => {
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
                await axios.delete(`http://127.0.0.1:8000/delete-student/${roll_no}`);
                toast.dismiss(); // Close confirmation toast
                toast.success("🗑️ Student Deleted Successfully!");
                fetchStudent();
              } catch (error) {
                toast.dismiss();
                toast.error("❌ Failed to delete student!");
              }
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={() => toast.dismiss()}
          >
            No
          </Button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const fetchStudent = async () =>{
     try {
      const response = await axios.get("http://127.0.0.1:8000/all-students");
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "60%", margin: "auto" }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to="/add-student"
            variant="contained"
            color="success"
            sx={{ margin: "20px" }}
          >
            Add New Student
          </Button>
        </Box>
        <Table
          sx={{ maxWidth: "80%", margin: "auto" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Roll No</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.map((std) => (
              <StyledTableRow key={std.id}>
                <StyledTableCell component="th" scope="row">
                  {std.name}
                </StyledTableCell>
                <StyledTableCell align="center">{std.roll_no}</StyledTableCell>
                <StyledTableCell align="center">{std.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                  component={Link}
                    to={`/update-student/${std.roll_no}`}
                    variant="contained"
                    color="success"
                    sx={{ margin: "10px" }}
                  >
                    Update
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ margin: "10px" }}
                    onClick = {()=> handleDelete(std.roll_no)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard;
