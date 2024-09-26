import connection  from '../database/dbConnection.js';
import { getRoom }  from '../functions/roomFunctions.js';

const API_URL = 'http://localhost:4000';

export function setupRoomRoutes (app) {
    
    app.get("/rooms", async (req, res) => {
        try {
            const SELECT_QUERY = "select ROOM_ID, ROOM_NAME, CAPACITY from ROOMS"
            const capacity = req.query.capacity;

            let rooms = [];

            connection.query(SELECT_QUERY, async (err, result) => {
                if (err) throw err;
                rooms =  await result;

                if(capacity && rooms){
                    rooms = rooms.filter(room => room.capacity === parseInt(capacity));
                }
            
                if(!rooms || rooms.length == 0) {
                    throw new Error("Error retrieving rooms!");
                } 
                res.json(rooms)
            });
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    });

    app.get("/rooms/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const room =  await getRoom(id);
            res.json(room);
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    });
}