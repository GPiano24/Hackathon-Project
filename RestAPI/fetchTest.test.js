const fetchTest = require('./fetchTest');

describe('fetchTest', () => {
    it('should return room with ID 1 when', async () => {
        const room = await fetchTest.getRoomById(1);
        expect(room.id).toEqual(1);
    })

    it('should return All Rooms when getAllRooms is called', async () => {
        const rooms = await fetchTest.getAllRooms();
        expect(rooms.length).toEqual(5);
    })
})