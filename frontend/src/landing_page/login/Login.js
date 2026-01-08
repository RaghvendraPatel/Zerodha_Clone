import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

function Login() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (data.success) {
        setSuccess("Login successful! Redirecting...");
        setInputValue({ email: "", password: "" });
        setTimeout(() => {
          window.location.href = "http://localhost:3001/";
        }, 500);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-5">
      <div className="card shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-2 fw-bold">Login Account</h2>
          <p className="text-center text-muted mb-4">Welcome back to Zerodha Clone</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-500">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                name="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-500">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                name="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                disabled={loading}
              />
            </div>

            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}
            {success && <div className="alert alert-success alert-dismissible fade show" role="alert">{success}</div>}

            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary btn-lg w-100 fw-bold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted">
              Don't have an account? <a href="/signup" className="text-decoration-none">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
