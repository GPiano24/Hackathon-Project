import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import Suggestions from "../components/Suggestions";

const BookingDisplay = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filter, setFilter] = useState({ time: "", room: "", capacity: "" });

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEvents([
      { date: date, time: "10:00 AM", room: "Room A", capacity: 20 },
      { date: date, time: "12:00 PM", room: "Room B", capacity: 15 },
      { date: date, time: "02:00 PM", room: "Room C", capacity: 10 },
      { date: date, time: "10:00 AM", room: "Room A", capacity: 20 },
      { date: date, time: "12:00 PM", room: "Room B", capacity: 15 },
      { date: date, time: "02:00 PM", room: "Room C", capacity: 10 },
      { date: date, time: "10:00 AM", room: "Room A", capacity: 20 },
      { date: date, time: "12:00 PM", room: "Room B", capacity: 15 },
      { date: date, time: "02:00 PM", room: "Room C", capacity: 10 },
    ]);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const days = daysInMonth(currentMonth, currentYear);
    const calendar = [];

    for (let i = 1; i <= days; i++) {
      const date = `${currentMonth + 1}/${i}/${currentYear}`;
      calendar.push(
        <div
          key={i}
          className={`w-12 h-12 flex items-center justify-center cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-200 ${
            selectedDate === date ? "bg-green-500 text-white rounded-full" : ""
          }`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return calendar;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredEvents = events.filter((event) => {
    return (
      (filter.time === "" || event.time.includes(filter.time)) &&
      (filter.room === "" || event.room.includes(filter.room)) &&
      (filter.capacity === "" ||
        event.capacity.toString().includes(filter.capacity))
    );
  });

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col items-center h-full overflow-auto">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mt-10">Schedules</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handlePrevMonth}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-600 rounded flex items-center"
              >
                <FaChevronLeft />
              </button>
              <h2 className="text-2xl font-bold mx-4">
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {currentYear}
              </h2>
              <button
                onClick={handleNextMonth}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-600 rounded flex items-center"
              >
                <FaChevronRight />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 border border-gray-300 p-2 rounded-lg">
              {renderCalendar()}
            </div>
          </div>
          {selectedDate && (
            <div className="mt-4 md:mt-0">
              <h2 className="text-2xl font-bold mb-2">
                Events on {selectedDate}
              </h2>
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Filter Events</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    name="time"
                    placeholder="Filter by time"
                    value={filter.time}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="room"
                    placeholder="Filter by room"
                    value={filter.room}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="capacity"
                    placeholder="Filter by capacity"
                    value={filter.capacity}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Time</th>
                    <th className="py-2 px-4 border-b">Room</th>
                    <th className="py-2 px-4 border-b">Room Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{event.date}</td>
                      <td className="py-2 px-4 border-b">{event.time}</td>
                      <td className="py-2 px-4 border-b">{event.room}</td>
                      <td className="py-2 px-4 border-b">{event.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center mt-10">
          <Suggestions />
        </div>
      </div>
    </>
  );
};

export default BookingDisplay;
