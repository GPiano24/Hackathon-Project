import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.png";
import background from "../assets/bg-mu.png";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken);

      const decodedToken = jwtDecode(data.accessToken);
      const userRole = decodedToken.role;

      if (userRole === "admin") {
        navigate("/a_booking");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${background})` }}
      />

      <form
        onSubmit={handleLogin}
        className="relative flex flex-col items-center justify-center h-3/5 w-1/3 bg-white rounded-2xl p-6 shadow-lg"
      >
        <img src={logo} alt="Manulife Logo" className="mb-6" />
        <div className="w-2/3 flex flex-col items-start justify-center mb-4">
          <p className="text-base">Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="h-12 w-full text-base rounded-md border border-black pl-2"
          />
        </div>
        <div className="w-2/3 flex flex-col items-start justify-center mb-4">
          <p className="text-base">Password</p>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full text-base rounded-md border border-black pl-2"
            required
          />
        </div>
        <div className="w-3/5 mt-4">
          <button
            className="w-full bg-gray-800 text-white py-3 rounded-md text-xl hover:bg-gray-700"
            type="submit"
          >
            LOGIN
          </button>
        </div>
        {errorMessage && (
          <div>
            <label className="text-red-500 text-sm">{errorMessage}</label>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthPage;
