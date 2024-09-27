import React, { useState } from "react";

const AdminTable = () => {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [data, setData] = useState([
    {
      date: "2023-10-01",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      room: "A101",
      capacity: 50,
      status: "pending",
      notes: "First meeting",
    },
    {
      date: "2023-10-02",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      room: "B202",
      capacity: 30,
      status: "approved",
      notes: "Second meeting",
    },
    {
      date: "2023-10-03",
      startTime: "12:00 PM",
      endTime: "01:00 PM",
      room: "C303",
      capacity: 20,
      status: "declined",
      notes: "Third meeting",
    },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...data];
    updatedData[index].status = newStatus;
    setData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const filteredData = data.filter(
    (item) =>
      (item.date.includes(filter) ||
        item.startTime.includes(filter) ||
        item.endTime.includes(filter) ||
        item.room.includes(filter) ||
        item.capacity.toString().includes(filter) ||
        item.notes.includes(filter)) &&
      (statusFilter === "" || item.status === statusFilter)
  );

  return (
    <div className="p-14">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search Filter..."
          className="p-2 border rounded mr-4 flex-grow"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="declined">Declined</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Start Time</th>
            <th className="py-2 px-4 border-b">End Time</th>
            <th className="py-2 px-4 border-b">Room</th>
            <th className="py-2 px-4 border-b">Room Capacity</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Notes</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{item.date}</td>
              <td className="py-2 px-4 border-b text-center">
                {item.startTime}
              </td>
              <td className="py-2 px-4 border-b text-center">{item.endTime}</td>
              <td className="py-2 px-4 border-b text-center">{item.room}</td>
              <td className="py-2 px-4 border-b text-center">
                {item.capacity}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editMode === index ? (
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                  </select>
                ) : (
                  <span
                    className={`${
                      item.status === "approved"
                        ? "text-green-500"
                        : item.status === "declined"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">{item.notes}</td>
              <td className="py-2 px-4 border-b text-center">
                {editMode === index ? (
                  <button
                    onClick={() => setEditMode(null)}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(index)}
                    className="p-2 bg-gray-500 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;