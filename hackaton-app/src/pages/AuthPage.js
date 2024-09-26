import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import background from "../assets/bg-mu.png";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onButtonClick = async () => {
    setError("");

    if (email === "" || password === "") {
      setError("Missing Fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/home");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setError("");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${background})` }}
      />

      <div className="relative flex flex-col items-center justify-center h-3/5 w-1/3 bg-white rounded-2xl p-6 shadow-lg">
        <img src={logo} alt="Manulife Logo" className="mb-6" />

        <div className="w-2/3 flex flex-col items-start justify-center mb-4">
          <p className="text-base">Email</p>
          <input
            value={email}
            onChange={handleInputChange(setEmail)}
            className="h-12 w-full text-base rounded-md border border-black pl-2"
          />
        </div>

        <div className="w-2/3 flex flex-col items-start justify-center mb-4">
          <p className="text-base">Password</p>
          <input
            value={password}
            type="password"
            onChange={handleInputChange(setPassword)}
            className="h-12 w-full text-base rounded-md border border-black pl-2"
          />
        </div>

        {error && (
          <div>
            <label className="text-red-500 text-sm">{error}</label>
          </div>
        )}

        <div className="w-3/5 mt-4">
          <button
            className="w-full bg-gray-800 text-white py-3 rounded-md text-xl hover:bg-gray-700"
            onClick={onButtonClick}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
