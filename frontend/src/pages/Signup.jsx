import React, { useState } from "react";
import axios from "axios";
import { AUTH_ENDPOINTS } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // 👈 same CSS file as Login

function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(AUTH_ENDPOINTS.SIGNUP, null, { params: formData });
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account ✨</h2>
        <p className="subtitle">Join the Student Management System</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
