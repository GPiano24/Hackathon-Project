import connection  from '../database/dbConnection.js';

export async function getUserRole(userId) {
    const SELECT_QUERY = `select USER_ID, ROLE_ID FROM USER_ROLES where USER_ID='${userId}'`;

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const users =  await result;
        
            if(!users || users.length == 0) {
                reject(new Error("Error retrieving user role!"));
            } 
            resolve(users[0])
        });
    });
}
