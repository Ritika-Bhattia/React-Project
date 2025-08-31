import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setError("❌ Email already exists! Please use another email.");
      setSuccess("");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("✅ Signup successful! Redirecting to login...");
    setError("");
    setName("");
    setEmail("");
    setPassword("");

    // redirect after signup
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const containerStyle = {
    minHeight: "100vh",
    width : "1850px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: "linear-gradient(to right, #4facfe, #00f2fe)",
     background: "linear-gradient(to bottom, #50c6d1ff, #FBC2EB, #369a51ff)",
  };

  const formStyle = {
    background: "linear-gradient(to right, #eae0b4ff, #ca924cff)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
    width: "550px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSignup}>
        <h2 style={{ textAlign: "center", color: "#9a1919ff" , fontSize : "35px", textShadow: "0 0 10px yellow, 0 0 20px orange, 0 0 30px red"}}>🌟 Sign Up</h2>

        <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  style={{ width: "530px", height: "20px", fontSize: "16px", padding: "8px" }}
/>

<input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  style={{ width: "530px", height: "20px", fontSize: "16px", padding: "8px" }}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  style={{ width: "530px", height: "20px", fontSize: "16px", padding: "8px" }}
/>


        <button
          type="submit"
          style={{
            background: "linear-gradient(to right, #43e97b, #38f9d7)",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          🚀 Sign Up
        </button>

        {error && <p style={{ color: "red", textAlign: "center" , fontSize : "20px"}}>{error}</p>}
        {success && (
          <p style={{ color: "green", textAlign: "center" }}>{success}</p>
        )}
      </form>
    </div>
  );
}
