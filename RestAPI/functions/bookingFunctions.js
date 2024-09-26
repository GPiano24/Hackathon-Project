import connection  from '../database/dbConnection.js';

export async function getBookings(status, fromDate, toDate) {
    const SELECT_QUERY = "select BOOKING_ID, USER_ID, ROOM_ID, APPROVED_IND, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS";

    let bookings = [];

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            bookings =  await result;

            if(status && bookings){
                bookings = bookings.filter(booking => booking.APPROVED_IND.toUpperCase() === status.toUpperCase());
            }

            if(fromDate && toDate) {
                const formattedFromDate = (new Date(fromDate)).toString();
                const formattedToDate = (new Date(toDate)).toString();

                bookings = bookings.filter(booking => (new Date(booking.FROM_BOOKING)).toString() === formattedFromDate &&
                    (new Date(booking.TO_BOOKING)).toString() === formattedToDate
                );
            }

            if(!bookings || bookings.length == 0) {
                reject(new Error('No bookings retrieved!'));
            }

            resolve(bookings)
        });
    });
}

export async function getBooking(bookingId) {
    const SELECT_QUERY = `select BOOKING_ID, USER_ID, ROOM_ID, APPROVED_IND, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where BOOKING_ID="${bookingId}"`;

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const bookings = await result;
            if (!bookings || bookings.length == 0) {
                reject(new Error("Booking not found!"))
            }
            else {
                resolve(bookings[0]);
            }
        });

    }, "")
};