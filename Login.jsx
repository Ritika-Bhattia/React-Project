import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width : "1850px",
        
        // background:  "linear-gradient(to right, #f4b3e0ff, #9e3c7aff)",
         background: "linear-gradient(to bottom, #9663c6ff, #FBC2EB, #c1bf50ff)",
      }}
    >
      <div
        style={{
          background: "#deb3edff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          width: "520px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#0f2559ff" , fontSize : "35px",  textShadow: "0 0 10px yellow, 0 0 20px orange, 0 0 30px red"}}>
          Login to Recipe App
        </h2>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "400px", padding: "10px", margin: "8px 0" }}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "400px", padding: "10px", margin: "8px 0" }}
          />

          <button
            type="submit"
            style={{
              width: "425px",
              padding: "10px",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#4caf50", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
