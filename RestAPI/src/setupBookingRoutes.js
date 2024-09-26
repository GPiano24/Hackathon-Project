import { getBookings, getBooking }  from '../functions/bookingFunctions.js';

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

}