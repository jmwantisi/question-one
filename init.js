const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config();

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.BD_PORT,
});

con.connect(function (err) {
    if (err) throw err;
    con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME};`, function (err, result) {
        if (err) throw err;
        console.log("Database created");
        process.exit()
    });
});