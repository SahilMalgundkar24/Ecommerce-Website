import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both username and password.");
    } else {
      axios
        .post(
          "/api/login",
          {
            Email: email,
            Password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          alert(res.data);
          if (res.data === "Logged in successfully") {
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signin" className="text-blue-500">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
