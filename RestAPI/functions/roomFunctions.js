import connection  from '../database/dbConnection.js';

export async function getRoom(roomId) {
    const SELECT_QUERY = `select ROOM_ID, ROOM_NAME, CAPACITY from ROOMS where ROOM_ID="${roomId}"`

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const room = await result;
    
            if (!room) {
                throw new Error("Room not found");
            }
            else {
                resolve(room[0]);
            }
        });

    }, "")
};