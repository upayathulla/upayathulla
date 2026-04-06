require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('ERROR connecting to MySQL: ', err.message);
        process.exit(1);
    }
    console.log('CONNECTED TO MYSQL');
    
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('ERROR creating table: ', err.message);
        } else {
            console.log('SUCCESS: Table "contacts" is ready in the "portfolio" schema!');
        }
        connection.end();
    });
});
