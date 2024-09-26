import React from "react";
import "../styles/suggestions.css";

const suggestions = [
  {
    room: "Conference Room A",
    roomNumber: "101",
    floor: "1st",
    time: "10:00 AM - 12:00 PM",
  },
  {
    room: "Meeting Room B",
    roomNumber: "202",
    floor: "2nd",
    time: "1:00 PM - 3:00 PM",
  },
  {
    room: "Conference Room C",
    roomNumber: "303",
    floor: "3rd",
    time: "2:00 PM - 4:00 PM",
  },
];

const Suggestions = () => {
  return (
    <div className="slider">
      <div className="slider-content">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="card bg-white shadow-lg rounded-lg p-6 m-4 flex-shrink-0 transform transition-transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {suggestion.room}
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Room Number:</span>{" "}
              {suggestion.roomNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Floor:</span> {suggestion.floor}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Time:</span> {suggestion.time}
            </p>
          </div>
        ))}
        {suggestions.map((suggestion, index) => (
          <div
            key={index + suggestions.length}
            className="card bg-white shadow-lg rounded-lg p-6 m-4 flex-shrink-0 transform transition-transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {suggestion.room}
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Room Number:</span>{" "}
              {suggestion.roomNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Floor:</span> {suggestion.floor}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Time:</span> {suggestion.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
