import connection  from '../database/dbConnection.js';
import { getUserRole }  from '../functions/userRoleFunctions.js';
import { getRoom, getAvailableRooms }  from '../functions/roomFunctions.js';


export async function getBookings(status, fromDate, toDate) {
    const SELECT_QUERY = "select BOOKING_ID, USER_ID, ROOM_ID, STATUS, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS";

    let bookings = [];

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            bookings =  await result;

            if(status && bookings){
                bookings = bookings.filter(booking => booking.STATUS.toUpperCase() === status.toUpperCase());
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
    const SELECT_QUERY = `select BOOKING_ID, USER_ID, ROOM_ID, STATUS, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where BOOKING_ID="${bookingId}"`;

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

export async function getEarliestAvailableSchedule(roomId) {
    const SELECT_QUERY = `select BOOKING_ID, USER_ID, ROOM_ID, STATUS, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where ROOM_ID="${roomId}" and TO_BOOKING > NOW() and STATUS <> 'declined' ORDER BY TO_BOOKING desc`;

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const bookings = await result;
            if (!bookings || bookings.length == 0) {
                reject(new Error("No bookings retrieved!"))
            }
            else {
                resolve(bookings[0].TO_BOOKING);
            }
        });

    }, "")
};

export async function getBookedRoomsPerSched(fromBooking, toBooking) {
    const SELECT_QUERY = `select ROOM_ID from ROOM_BOOKINGS where FROM_BOOKING >= "${fromBooking}" and TO_BOOKING <= "${toBooking}" and STATUS <> 'declined'`;

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const bookings = await result;
            if (!bookings || bookings.length == 0) {
                reject(new Error("No bookings retrieved!"))
            }
            else {
                const roomIds = bookings.map(booking => booking.ROOM_ID);

                resolve(Array.from(new Set(roomIds)));
            }
        });

    }, "")
};

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
    return Math.random().toString(36).substr(2, 6).toUpperCase(); 
}

function isValidDateTime(dateTime) {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return dateTimeRegex.test(dateTime);
}

export async function bookARoom(user_id, room_id, from_booking, to_booking, status, booking_reason, remarks, capacity) {
    const bookings = await getBookings(null, null, null);
    const room = await getRoom(room_id);

    if (!isValidDateTime(from_booking) || !isValidDateTime(to_booking)) {
        throw new Error('Invalid date format. Use "YYYY-MM-DD HH:mm:ss".');
    }

    if (room.CAPACITY < capacity) {
        throw new Error(`Selected room only has ${capacity}`);
    }

    const fromDate = new Date(from_booking);
    const toDate = new Date(to_booking);

    if (fromDate >= toDate) {
        throw new Error('From booking must be earlier than To booking.');
    }

    const newBooking = {
        booking_id: generateBookingId(),
        user_id,
        room_id,
        status: "Pending",
        booking_reason,
        date_booked: formatDateTime(new Date()),
        from_booking: formatDateTime(fromDate),
        to_booking: formatDateTime(toDate),
        remarks: "Upon Admin approval"
    };

    const overlapBookings = bookings.filter(booking => {
        let newFromBooking = new Date(from_booking);
        let previousFromBooking = new Date(booking.FROM_BOOKING);
        let newToBooking = new Date(to_booking);
        let previousToBooking = new Date(booking.TO_BOOKING);

        return booking.ROOM_ID === room_id && 
        ((newFromBooking.getTime() >= previousFromBooking.getTime() && newFromBooking.getTime() < previousToBooking.getTime()) || 
         (newToBooking.getTime() > previousFromBooking.getTime() && newToBooking.getTime() <= previousToBooking.getTime()) || 
         (newFromBooking.getTime() <= previousFromBooking.getTime() && newToBooking.getTime() >= previousToBooking.getTime()))
});

    let message = "";
    let earliestScheduleForRoom = null;
    let availableRooms = null;

    if(overlapBookings && overlapBookings.length > 0) {
        const previousReserverRole = await getUserRole(overlapBookings[0].USER_ID)
        const presentReserverRole = await getUserRole(user_id)

        if ((previousReserverRole.ROLE_ID === 'TE' && presentReserverRole.ROLE_ID == 'ST') ||
            ((previousReserverRole.ROLE_ID === 'AD' && presentReserverRole.ROLE_ID == 'TE'))) {
            earliestScheduleForRoom = await getEarliestAvailableSchedule(room_id);
            const bookedRooms = await getBookedRoomsPerSched(newBooking.from_booking, newBooking.to_booking);
            console.log("BOOKED ROOMS " + JSON.stringify(bookedRooms))
            availableRooms = await getAvailableRooms(bookedRooms);
        }

        message = "You're in queue";
    }

    const INSERT_QUERY = `INSERT INTO ROOM_BOOKINGS (booking_id, user_id, room_id, status, booking_reason, date_booked, from_booking, to_booking, remarks) VALUES ('${newBooking.booking_id}', '${newBooking.user_id}', '${newBooking.room_id}', '${newBooking.status}', '${newBooking.booking_reason}', '${newBooking.date_booked}', '${newBooking.from_booking}', '${newBooking.to_booking}', '${newBooking.remarks}');`

    return new Promise((resolve, reject) => {
        if(earliestScheduleForRoom || availableRooms) {
            resolve({availableRooms: availableRooms, earliestRoomSchedule: earliestScheduleForRoom});
        }
        else {
            connection.query(INSERT_QUERY, async (err, result) => {
                if (err) throw err;
                const booking = await result;
                if (!booking) {
                    reject(new Error("No booking created!"))
                }
                else {
                    console.log("BOOKING " + JSON.stringify(booking));
    
                    resolve({...newBooking, message:message});
                }
            });
        }
    }, "")
};

export async function updateBooking(bookingId, status, remarks) {
    let UPDATE_QUERY = "";

    if(status && remarks) {
        UPDATE_QUERY = `UPDATE ROOM_BOOKINGS SET STATUS = '${status}', REMARKS = '${remarks}' WHERE BOOKING_ID='${bookingId}`;
    }
    else if(status) {
        UPDATE_QUERY = `UPDATE ROOM_BOOKINGS SET STATUS = '${status}' WHERE BOOKING_ID='${bookingId}`;
    }
    else if(remarks) {
        UPDATE_QUERY = `UPDATE ROOM_BOOKINGS SET REMARKS = '${remarks}' WHERE BOOKING_ID='${bookingId}`;
    }

    return new Promise((resolve, reject) => {
        connection.query(UPDATE_QUERY, async (err, result) => {
            if (err) throw err;
            const result = await result;
            if (!result) {
                reject(new Error("Booking update failed!"))
            }
            else {
                const booking = await getBooking(bookingId);
                resolve(booking);
            }
        });

    }, "")
};
