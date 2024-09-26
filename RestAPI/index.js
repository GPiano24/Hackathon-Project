const express = require("express");
const cors = require("cors");
const data = require("./rooms");
const fetchData = require("./fetchTest");
const fetchTest = require("./fetchTest");

const app = express();
const { PORT = 4000 } = process.env;

app.use(express.json());
app.use(cors());

app.get("/rooms", (req, res) => {
    res.json(data.rooms)
});

app.get("/rooms/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const room = data.rooms.find(room => room.id === id);
    if (!room) {
        res.status(404).send("Room not found");
    } else {
        res.json(room);
    }
})

fetchTest.getRoomById(2)

app.get("/", (req, res) => res.send("Welcome to API"));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));