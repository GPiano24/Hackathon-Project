const fetch = require('node-fetch')
process.env.NODE_TLS_REJECT_UNAUTHORIZED=0

const API_URL = 'http://localhost:4000/';

const Query = {
    user: async(parent,args,context,info) => {
        const {id} = args;
        const response = await fetch(`${API_URL}users/${id}`);
        const data = await response.json();
        return data;
    },
    users: async(parent,args,context,info) => {
        const response = await fetch(`${API_URL}users`);
        const data = await response.json();
        return data;
    },

    bookings: async(parent,args,context,info) => {
        const {id} = args;
        const response = await fetch(`${API_URL}bookings/${id}`);
        const data = await response.json();
        return data;
    },

    bookings: async(parent,args,context,info) => {
        const response = await fetch(`${API_URL}bookings`);
        const data = await response.json();
        return data;
    },

    rooms: async(parent,args,context,info) => {
        const response = await fetch(`${API_URL}rooms`);
        const data = await response.json();
        return data;
    },

    room: async (parent,args,context,info) => {
        const {id} = args;
        const response = await fetch(`${API_URL}rooms/${id}`);
        const data = await response.json();
        return data;
    }
}

module.exports = {Query};