const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Divi@9291',
    database: 'booksy_chat',
    port: 3306 // Use your MySQL port here
});

// Connect to Database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint to send messages
app.post('/send-message', (req, res) => {
    const { username, message } = req.body;

    if (!username || !message) {
        return res.status(400).send('Username and message are required.');
    }

    const sql = 'INSERT INTO messages (username, message) VALUES (?, ?)';
    db.query(sql, [username, message], (error, results) => {
        if (error) {
            console.error('Error inserting message: ' + error);
            return res.status(500).send('Error saving message.');
        }
        res.status(200).send('Message sent successfully!');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Endpoint to get messages
app.get('/messages', (req, res) => {
    db.query('SELECT * FROM messages ORDER BY timestamp DESC', (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving messages.');
        }
        res.json(results); // Send the messages back as JSON
    });
});
