import { getBookings, getBooking, getEarliestAvailableSchedule, getBookedRoomsPerSched, bookARoom}  from '../functions/bookingFunctions.js';
import { getUserRole }  from '../functions/userRoleFunctions.js';
import { getRoom, getAvailableRooms }  from '../functions/roomFunctions.js';

const API_URL = 'http://localhost:4000';

export function setupBookingRoutes (app) {
    app.get("/bookings", async (req, res) => {
        try {
            const status = req.query.status; 
            const fromDate = req.query.fromBooking;
            const toDate = req.query.toBooking;
    
            const bookings = await getBookings(status, fromDate, toDate);
        
            if(!bookings || bookings.length == 0) {
                throw new Error('No bookings retrieved!');
            }

            res.json(bookings);
        }  catch(error) {
            res.status(400).json({error: error.message});
        }
    });    


    app.get("/bookings/:bookingId", async (req, res) => {
        try {
            const bookingId = req.params.bookingId;
            const booking = await getBooking(bookingId);
            res.json(booking);
        }  catch(error) {
            res.status(400).json({error: error.message});
        }
    });  
    
        
    app.post('/bookings', async (req, res) => {
        try {
            const { user_id, room_id, from_booking, to_booking, status, booking_reason, remarks, capacity } = req.body;
            const result = await bookARoom(user_id, room_id, from_booking, to_booking, status, booking_reason, remarks, capacity);

            res.json(result);
        } catch(error) {
            res.status(400).json({error: error.message});
        }  

    })};