import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

function Signup() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { email, password, username } = inputValue;

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
    if (!email || !password || !username) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        {
          email,
          password,
          username,
        },
        { withCredentials: true }
      );

      if (data.success) {
        setSuccess("Signup successful! Redirecting...");
        setInputValue({ email: "", password: "", username: "" });
        
        // Wait a moment for token to be set in cookie, then redirect to trading dashboard
        setTimeout(() => {
          window.location.href = "http://localhost:3001/";
        }, 500);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error details:", error);
      console.error("Error response:", error.response);
      const errorMsg = error.response?.data?.message || error.message || "An error occurred during signup";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-5">
      <div className="card shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-2 fw-bold">Create Account</h2>
          <p className="text-center text-muted mb-4">Join Zerodha Clone today</p>

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

            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-500">Username</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="username"
                id="username"
                value={username}
                placeholder="Choose a username"
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
                placeholder="At least 6 characters"
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
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted">
              Already have an account? <a href="/login" className="text-decoration-none">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;