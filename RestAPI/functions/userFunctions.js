import connection from "../database/dbConnection.js";

export async function getUsers() {
    const SELECT_QUERY = 'SELECT * FROM USERS';
    let users = [];
    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            
            if (err) throw err;
            users = await result;

            if (!users || users.length == 0) {
                throw new Error("Error retrieving users!");
            }
            resolve(users)
        });
    });
}

export async function getUser(userId) {
    const SELECT_QUERY = `SELECT * FROM USERS WHERE user_id="${userId}"`;

    return new Promise((resolve, reject) => {
        connection.query(SELECT_QUERY, async (err, result) => {
            if (err) throw err;
            const user = await result;

            if (!user) {
                throw new Error("User not found");
            }
            else {
                resolve(user[0]);
            }
        });

    }, "")
};