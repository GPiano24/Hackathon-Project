import { getRoom, getRooms }  from '../functions/roomFunctions.js';

const API_URL = 'http://localhost:4000';

export function setupRoomRoutes (app) {
    
    app.get("/rooms", async (req, res) => {
        try {
            const capacity = req.query.capacity;

            let rooms = await getRooms(capacity);
            res.json(rooms);
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