const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

describe("resolver tests", () => {
    test('room with id 1 should return room with id 1', async () => {
        const room = await resolvers.Query.room(null, {id: 1});
        expect(room.id).toBe(1);
    });

    test('room with id 2 should return room with id 2', async () => {
        const room = await resolvers.Query.room(null, {id: 2});
        expect(room.id).toBe(2);
    });

    test('rooms should return all rooms', async () => {
        const rooms = await resolvers.Query.rooms();
        expect(rooms.length).toBeGreaterThan(0);
    });

    test('Booking with id AR7EKD should return booking with id 1', async () => {
        const booking = await resolvers.Query.booking(null, {id: 'AR7EKD'});
        expect(booking.booking_id).toBe('AR7EKD');
    });

    test('Bookings should return all bookings', async () => {
        const bookings = await resolvers.Query.bookings();
        expect(bookings.length).toBeGreaterThan(0);
    });
});
