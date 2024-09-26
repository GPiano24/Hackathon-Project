import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ContactUsPage from "./pages/ContactUsPage";
import AdminBookingPage from "./pages/AdminBookingPage";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/a_booking" element={<AdminBookingPage />} />
            <Route path="/booking" element={<AdminBookingPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
          <Footer />
        </header>
      </div>
    </Router>
  );
}

export default App;
