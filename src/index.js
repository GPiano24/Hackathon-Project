const express =  require("express");
const cors = require("cors");
const data =  require("../rooms.js");
const data2 = require("../room_bookings.js");
// const fetchData = require("./fetchTest");
// const fetchTest = require("./fetchTest");

const app = express();
const { PORT = 4000 } = process.env;

app.use(express.json());
app.use(cors());

app.get("/rooms", (req, res) => {
    const c = parseInt(req.query.capacity);
    
    let rooms = data.rooms;

    if(c){
        rooms = data.rooms.filter(room => room.capacity === c);
    }

    res.json(rooms)
});

app.get("/rooms/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const room = data.rooms.find(room => room.id === id);
    if (!room) {
        res.status(404).send("Room not found");
    } else {
        res.json(room);
    }
})

app.get("/bookings", (req, res) => {   
    const status = req.query.approved_ind; 
    const fromDate = req.query.from_booking;
    const toDate = req.query.to_booking;

    let bookings = data2.bookings;

    if(status){
        bookings = data2.bookings.filter(booking => booking.approved_ind === status.toUpperCase());
    }

    if(fromDate&&toDate){
        bookings = data2.bookings.filter(booking => booking.from_booking === fromDate && booking.to_booking === toDate);
    }

    res.json(bookings)
})

app.get("/bookings/:booking_id", (req, res) => {
    const bookingId = req.params.booking_id;
    const booking =  data2.bookings.find(booking => booking.booking_id === bookingId);
    if (!booking) 
        return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
   
})

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateBookingId() {
    return Math.random().toString(36).substr(2, 8).toUpperCase(); 
}

function isValidDateTime(dateTime) {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return dateTimeRegex.test(dateTime);
}

app.post('/bookings', (req, res) => {
    const { user_id, room_id, from_booking, to_booking, approved_ind, booking_reason, remarks } = req.body;

    if (!isValidDateTime(from_booking) || !isValidDateTime(to_booking)) {
        return res.status(400).json({ message: 'Invalid date format. Use "YYYY-MM-DD HH:mm:ss".' });
    }

    const fromDate = new Date(from_booking);
    const toDate = new Date(to_booking);

    if (fromDate >= toDate) {
        return res.status(400).json({ message: 'From booking must be earlier than To booking.' });
    }

    const newBooking = {
        booking_id: generateBookingId(),
        user_id,
        room_id,
        approved_ind: "N",
        booking_reason,
        from_booking: formatDateTime(fromDate),
        to_booking: formatDateTime(toDate),
        remarks: ""
    };

    const hasOverlap = data2.bookings.some(booking => 
        booking.room_id === room_id && 
        ((newBooking.from_booking >= booking.from_booking && newBooking.from_booking < booking.to_booking) || 
         (newBooking.to_booking > booking.from_booking && newBooking.to_booking <= booking.to_booking) || 
         (newBooking.from_booking <= booking.from_booking && newBooking.to_booking >= booking.to_booking))
    );

    if (hasOverlap) {
        return res.status(400).json({ message: 'Booking time overlaps with an existing booking in the same room.' });
    }

    data2.bookings.push(newBooking);

    res.status(201).json(newBooking);
});

// fetchTest.getRoomById(2)

app.get("/", (req, res) => res.send("Welcome to API"));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
