import React, { useState, useEffect } from "react";
import "../styles/suggestions.css";

const API_URL = "http://localhost:4000/available-rooms"; // URL to fetch declined rooms

const Suggestions = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchDeclinedRooms = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    fetchDeclinedRooms();
  }, []);

  return (
    <div className="slider">
      <div className="slider-content">
        {rooms &&
          rooms.map((room, index) => (
            <div
              key={index}
              className="card bg-white shadow-lg rounded-lg p-6 m-4 flex-shrink-0 transform transition-transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {room.ROOM_NAME}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Room Number:</span> {room.ROOM_ID}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Capacity:</span> {room.CAPACITY}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Suggestions;
