const mysql2 = require('mysql2')
require('dotenv').config();

const connection = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME,
}
)

connection.getConnection((err, conn) => {
    if (err) {
        console.log("Error Connecting to Database", err)
        conn.release() /* Opened and Closed Connection. Released Connection to Connection Pool */
    }
    else {
        console.log("Connected to MySQL database");
    }
})

module.exports = connection