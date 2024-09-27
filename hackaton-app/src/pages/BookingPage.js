import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    room: "",
    date: "",
    fromTime: "",
    toTime: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const postBody = {
    ...formData,
    user_id: 510645,
    room_id:'R001',
    CAPACITY: 10,
    from_booking: `${formData.date} ${formData.fromTime}:00`,
    to_booking: `${formData.date} ${formData.toTime}:00`,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", postBody);
    const response = fetch("http://localhost:4000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setFormData({
          name: "",
          room: "",
          date: "",
          fromTime: "",
          toTime: "",
          description: "",
        });
    })
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    setFormData({
      name: "",
      room: "",
      date: "",
      fromTime: "",
      toTime: "",
      description: "",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#EBFFEE",
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          textAlign: "center",
          color: "#2C2C2C",
        }}
      >
        Book Room
      </Typography>
      <Card
        sx={{ maxWidth: "600px", padding: 4, borderRadius: 2, boxShadow: 3 }}
      >
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ marginBottom: 3 }}
              required
            />

            <FormControl fullWidth sx={{ marginBottom: 3 }} required>
              <InputLabel>Room</InputLabel>
              <Select name="room" value={formData.room} onChange={handleChange}>
                <MenuItem value="">
                  <em>Select Room</em>
                </MenuItem>
                <MenuItem value="Room 1">Room 1</MenuItem>
                <MenuItem value="Room 2">Room 2</MenuItem>
                <MenuItem value="Room 3">Room 3</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              sx={{ marginBottom: 3 }}
              InputLabelProps={{ shrink: true }}
              required
            />

            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
              <TextField
                fullWidth
                type="time"
                label="From"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                type="time"
                label="To"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ marginBottom: 3 }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancel}
                sx={{
                  width: "45%",
                  transition: "background-color 0.3s, color 0.3s",
                  "&:hover": {
                    backgroundColor: "#f44336",
                    color: "white",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#2C2C2C", width: "45%" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;