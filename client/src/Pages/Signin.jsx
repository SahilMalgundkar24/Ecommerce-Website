import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignin = () => {
    if (!username || !password || !confirmPassword || !email) {
      alert("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match. Please confirm your password.");
    } else {
      axios
        .post(
          "/api/signup",
          {
            Username: username,
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
          if (res.data === "Signed up successfully") {
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // Perform sign-in action, for now just redirecting to home ("/")
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        placeholder="Enter your Email"
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
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleSignin} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Sign In
      </button>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signin;
