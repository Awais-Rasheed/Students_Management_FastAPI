export const BASE_URL = "http://127.0.0.1:8000";

export const STUDENT_ENDPOINTS = {
  GET_ALL: `${BASE_URL}/all-students`,
  ADD: `${BASE_URL}/add-student`,
  UPDATE: (rollNo) => `${BASE_URL}/update-student/${rollNo}`,
  DELETE: (rollNo) => `${BASE_URL}/delete-student/${rollNo}`,
};

export const AUTH_ENDPOINTS = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
};