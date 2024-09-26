import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ContactUsPage from "./pages/ContactUsPage";
import AdminBookingPage from "./pages/AdminBookingPage";

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/a_booking" element={<AdminBookingPage />} />
            <Route path="/booking" element={<AdminBookingPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>

      </div>
    </Router>

    // <>
    //   <AuthPage />
    // </>


  );
}

export default App;
