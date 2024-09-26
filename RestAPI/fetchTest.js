
module.exports = {
    //function that uses rest API call to get All Rooms
    getAllRooms: async function () {
        const response = await fetch("http://localhost:4000/rooms");
        const data = await response.json();
        return data;
    },
    //function that uses rest API call to get Room by ID
    getRoomById: async function (id) {
        const response = await fetch(`http://localhost:4000/rooms/${id}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
}