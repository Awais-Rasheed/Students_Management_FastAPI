import axios from "axios";
import { STUDENT_ENDPOINTS } from "./api";

export const getAllStudents = async () => {
  const response = await axios.get(STUDENT_ENDPOINTS.GET_ALL);
  return response.data;
};

export const addStudent = async (data) => {
  const response = await axios.post(STUDENT_ENDPOINTS.ADD, data);
  return response.data;
};

export const updateStudent = async (rollNo, params) => {
  const response = await axios.put(STUDENT_ENDPOINTS.UPDATE(rollNo), null, { params });
  return response.data;
};

export const deleteStudent = async (rollNo) => {
  const response = await axios.delete(STUDENT_ENDPOINTS.DELETE(rollNo));
  return response.data;
};
