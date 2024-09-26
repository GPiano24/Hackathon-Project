import connection  from '../database/dbConnection.js';

export async function getRooms(capacity) {
    const SELECT_QUERY = "select ROOM_ID, ROOM_NAME, CAPACITY from ROOMS"

    let rooms = [];

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            rooms =  await result;

            if(capacity && rooms){
                rooms = rooms.filter(room => room.capacity === parseInt(capacity));
            }
        
            if(!rooms || rooms.length == 0) {
                reject(new Error("Error retrieving rooms!"));
            } 
            resolve(rooms)
        });
    });
}

export async function getRoom(roomId) {
    const SELECT_QUERY = `select ROOM_ID, ROOM_NAME, CAPACITY from ROOMS where ROOM_ID="${roomId}"`

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const room = await result;
    
            if (!room) {
                reject(new Error("Room not found"));
            }
            else {
                resolve(room[0]);
            }
        });

    }, "")
};