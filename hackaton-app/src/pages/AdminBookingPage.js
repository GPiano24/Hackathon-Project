import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const AdminBookingPage = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithAuth("http://localhost:4000/admin", {
          method: "GET",
        });
        setData(result);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <p>{data}</p>
      <h1>Admin Booking Page</h1>
    </div>
  );
};

export default AdminBookingPage;
