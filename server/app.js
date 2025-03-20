const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Load data from db.json
const dbPath = path.join(__dirname, 'db.json');

// Get all doors
app.get('/doors', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }
        const doors = JSON.parse(data).doors; // Accessing the doors array
        res.send(doors);
    });
});

// Get a specific door
app.get('/doors/:id', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }
        const doors = JSON.parse(data).doors; // Accessing the doors array
        const door = doors.find(d => d.id === req.params.id); // No need to parseInt since id is a string
        if (!door) {
            return res.status(404).send('Door not found');
        }
        res.send(door);
    });
});

// Update a specific door
app.put('/doors/:id', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }
        const doors = JSON.parse(data).doors; // Accessing the doors array
        const doorIndex = doors.findIndex(d => d.id === req.params.id);
        if (doorIndex === -1) {
            return res.status(404).send('Door not found');
        }
        doors[doorIndex] = { ...doors[doorIndex], ...req.body };
        fs.writeFile(dbPath, JSON.stringify({ doors }, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error updating door');
            }
            res.send({ message: 'Door updated successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
