import {
  getBookings,
  getBooking,
  getEarliestAvailableSchedule,
  getBookedRoomsPerSched,
  bookARoom,
  updateBooking,
} from "../functions/bookingFunctions.js";
import { getAvailableRooms } from "../functions/roomFunctions.js";

const API_URL = "http://localhost:4000";

export function setupBookingRoutes(app) {
  app.get("/bookings", async (req, res) => {
    try {
      const status = req.query.status;
      const fromDate = req.query.fromBooking;
      const toDate = req.query.toBooking;

      const bookings = await getBookings(status, fromDate, toDate);

      if (!bookings || bookings.length == 0) {
        throw new Error("No bookings retrieved!");
      }

      res.json(bookings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/bookings/:bookingId", async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const booking = await getBooking(bookingId);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/bookings", async (req, res) => {
    try {
      const {
        user_id,
        room_id,
        from_booking,
        to_booking,
        status,
        booking_reason,
        remarks,
        capacity,
      } = req.body;
      const result = await bookARoom(
        user_id,
        room_id,
        from_booking,
        to_booking,
        status,
        booking_reason,
        remarks,
        capacity
      );

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/bookings", async (req, res) => {
    try {
      const { bookingId, status, remarks } = req.body;
      const result = await updateBooking(bookingId, status, remarks);

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/available-rooms", async (req, res) => {
    try {
      const declinedBookings = await getBookings("declined", null, null);
      if (!declinedBookings || declinedBookings.length === 0) {
        return res.status(200).json([]);
      }

      const roomIds = declinedBookings.map((booking) => booking.ROOM_ID);
      const availableRooms = await getAvailableRooms(roomIds);

      if (!availableRooms || availableRooms.length === 0) {
        return res.status(200).json([]);
      }
      res.json(availableRooms);
    } catch (error) {
      res.status(200).json([]);
    }
  });
}
