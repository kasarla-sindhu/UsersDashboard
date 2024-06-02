const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            dob TEXT,
            contact TEXT,
            email TEXT,
            description TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            }
        });
    }
});

// CRUD routes
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

app.post('/api/user', (req, res) => {
    const { name, dob, contact, email, description } = req.body;
    db.run(`INSERT INTO users (name, dob, contact, email, description) VALUES (?, ?, ?, ?, ?)`,
        [name, dob, contact, email, description],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: { id: this.lastID }
            });
        }
    );
});

app.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, dob, contact, email, description } = req.body;
    db.run(`UPDATE users SET name = ?, dob = ?, contact = ?, email = ?, description = ? WHERE id = ?`,
        [name, dob, contact, email, description, id],
        function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: { changes: this.changes }
            });
        }
    );
});

app.delete('/api/user/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'deleted',
            changes: this.changes
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});