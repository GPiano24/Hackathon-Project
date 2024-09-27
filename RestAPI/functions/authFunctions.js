import connection from "../database/dbConnection.js";

export const getUserByUsername = (username, callback) => {
  const query = `
    SELECT * FROM USERS WHERE username = ?
  `;
  connection.query(query, [username], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);

   // console.log("This is from getUserByUsername function");
   // console.log(results[0]);

    return callback(null, results[0]);
  });
};

export const getUserRole = (userId, callback) => {
  const query = `
    SELECT r.role_name 
    FROM USER_ROLES ur 
    JOIN ROLES r ON ur.role_id = r.role_id 
    WHERE ur.user_id = ?
  `;
  connection.query(query, [userId], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);

    return callback(null, results[0].role_name);
  });
};
