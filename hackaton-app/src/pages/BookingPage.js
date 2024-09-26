import React, { useState } from 'react';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    room: '',
    date: '',
    fromTime: '',
    toTime: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    setFormData({
      name: '',
      room: '',
      date: '',
      fromTime: '',
      toTime: '',
      description: '',
    });
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-screen-md bg-white rounded-xl shadow-xl p-12">
        <h1 className="text-5xl font-bold text-center text-black mb-10">Book Room</h1>

        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="text-red-500 border border-red-500 px-4 py-1 text-lg rounded hover:bg-red-500 hover:text-white transition"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-gray-700 text-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">Room</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-gray-700 text-lg focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select Room</option>
              <option value="Room 1">Room 1</option>
              <option value="Room 2">Room 2</option>
              <option value="Room 3">Room 3</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-gray-700 text-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">From</label>
              <input
                type="time"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-1 text-gray-700 text-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">To</label>
              <input
                type="time"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-1 text-gray-700 text-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold text-lg mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-1 text-gray-700 text-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-900 text-white font-bold py-2 rounded-lg text-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
