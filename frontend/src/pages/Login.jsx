import React, { useState } from "react";
import axios from "axios";
import { AUTH_ENDPOINTS } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // 👈 create this file for styles

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(AUTH_ENDPOINTS.LOGIN, null, {
        params: formData,
      });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to manage students</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link">
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
