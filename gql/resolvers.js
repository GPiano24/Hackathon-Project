const fetch = require('node-fetch')
process.env.NODE_TLS_REJECT_UNAUTHORIZED=0

const API_URL = ''

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
}

module.exports = {Query};