import express from "express";
import cors from "cors";

import { setupRoomRoutes } from "./setupRoomRoutes.js";

const app = express();
const { PORT = 4000 } = process.env;

app.use(express.json());
app.use(cors());

// ROUTES
setupRoomRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});