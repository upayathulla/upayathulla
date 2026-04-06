require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Email Transporter (Gmail suggested)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err.message);
    } else {
        console.log('Connected to MySQL Database: ' + process.env.DB_NAME);
        connection.release();
    }
});

// Contact API Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ', err);
            return res.status(500).json({ error: 'Database insertion failed.' });
        }
        
        console.log(`New contact message from ${name} (${email}) saved.`);

        // --- NEW: Automatically send an email notification ---
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `🚀 New Message from ${name} (Portfolio)`,
            html: `
                <h3>Contact Form Received</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
                <hr />
                <p>Sent from your local Portfolio Backend.</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email failed to send: ', error);
                // We still send 200 because the message WAS saved to the DB
                return res.status(200).json({ 
                    success: true, 
                    message: 'Signal saved to DB, but email notification failed.', 
                    id: result.insertId 
                });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ 
                success: true, 
                message: 'Signal transmitted and email notification sent!', 
                id: result.insertId 
            });
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Portfolio Backend Server running on port ${PORT}`);
});
