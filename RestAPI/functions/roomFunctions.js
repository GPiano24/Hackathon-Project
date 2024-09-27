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


export async function getAvailableRooms(roomIds) {
    let roomIdsQuery = "(";

    for(let i = 0; i < roomIds.length; i++) {
        roomIdsQuery += "'" + roomIds[i] + "'";
        if(i+1 < roomIds.length) {
            roomIdsQuery += ","
        }
    }

    roomIdsQuery += ")";
    console.log("ROOM IDS QUERY " + roomIdsQuery)

    const SELECT_QUERY = `select ROOM_ID, ROOM_NAME, CAPACITY from ROOMS where ROOM_ID not in ${roomIdsQuery}`;

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const rooms = await result;
    
            if (!rooms) {
                reject({getAvailableRoomsMessage: "No available rooms for given schedule"});
            }
            else {
                resolve(rooms);
            }
        });

    }, "")
};