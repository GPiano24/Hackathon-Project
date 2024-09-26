import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import BookingDisplay from "./pages/BookingDisplay";
import BookingPage from "./pages/BookingPage";
import AuthPage from "./pages/AuthPage";
import ContactUsPage from "./pages/ContactUsPage";
import AdminBookingPage from "./pages/AdminBookingPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import { FaMessage } from "react-icons/fa6";
import { ProtectedRoute, PublicRoute } from "./routes";

const BubbleButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/contact-us")}
      className="fixed bottom-4 right-4 bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-900 transition-colors"
    >
      <FaMessage />
    </button>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/a_booking"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-display"
              element={
                <ProtectedRoute>
                  <BookingDisplay />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact-us"
              element={
                <ProtectedRoute>
                  <ContactUsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
        <BubbleButton />
      </div>
    </Router>
  );
}

export default App;
