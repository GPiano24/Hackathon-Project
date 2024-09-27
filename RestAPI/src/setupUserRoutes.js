import { getUser, getUsers } from "../functions/userFunctions.js";

const API_URL = 'http://localhost:4000';

export function setupUserRoutes(app) {

    app.get("/users", async (req, res) => {
        try {
            let users = await getUsers();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    });

    app.get("/users/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const user = await getUser(id);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}