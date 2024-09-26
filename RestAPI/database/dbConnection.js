import dotenv from "dotenv";
import mysql2 from 'mysql2';

let env = process.env;
dotenv.config();

const connection = mysql2.createConnection({
    host: `${env.APP_DB_HOST}`,
    user: `${env.APP_DB_USERNAME}`,
    password: `${env.APP_DB_PASSWORD}`,
    database: `${env.APP_DB_NAME}`
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });