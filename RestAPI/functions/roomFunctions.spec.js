import { getRoom }  from './roomFunctions.js';
describe('getRoom', () => {
    it('should return the room associated with the room_id in ROOM table', () => {
        //Arrange
        const roomId = "R001";

        //Act
        const result = getRoom(roomId);

        const expectedAnswer = JSON.stringify("{\"ROOM_ID\": \"R001\",\"ROOM_NAME\": \"Chemistry Room\",\"CAPACITY\": 200}");
        //Assert
        expect(JSON.stringify(result)).toEqual(expectedAnswer);
    });
});