// Required dependencies
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, 'event-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: Images only!'));
    }
});



// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes for HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add-event', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-event.html'));
});

app.get('/view-event', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view-event.html'));
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Create event endpoint
app.post('/api/events', (req, res) => {
    const {
        title,
        description,
        event_date,
        time,
        location,
        organizer,
        max_attendees,
        category,
        image_url
    } = req.body;

    const sql = `
        INSERT INTO events 
        (title, description, event_date, time, location, organizer, max_attendees, category, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        title,
        description,
        event_date,
        time,
        location,
        organizer,
        max_attendees || null,
        category,
        image_url || null
    ], (err, result) => {
        if (err) {
            console.error('Error creating event:', err);
            return res.status(500).json({ error: 'Error creating event' });
        }
        res.status(201).json({ message: 'Event created successfully', id: result.insertId });
    });
});

// Get all events
app.get('/api/events', (req, res) => {
    const sql = 'SELECT * FROM events ORDER BY event_date DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json({ error: 'Error fetching events' });
        }
        res.json(results);
    });
});

// Get upcoming events (limit 2)
app.get('/api/events/upcoming', (req, res) => {
    const sql = 'SELECT * FROM events WHERE event_date >= CURDATE() ORDER BY event_date ASC LIMIT 2';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching upcoming events:', err);
            return res.status(500).json({ error: 'Error fetching upcoming events' });
        }
        res.json(results);
    });
});

// Get single event
app.get('/api/events/:id', (req, res) => {
    const sql = 'SELECT * FROM events WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).json({ error: 'Error fetching event' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(result[0]);
    });
});

// Update event
app.put('/api/events/:id', (req, res) => {
    const {
        title,
        description,
        event_date,
        time,
        location,
        organizer,
        max_attendees,
        category,
        image_url
    } = req.body;

    const sql = `
        UPDATE events 
        SET title = ?, description = ?, event_date = ?, time = ?, location = ?, organizer = ?, max_attendees = ?, category = ?, image_url = ? 
        WHERE id = ?
    `;

    db.query(sql, [
        title,
        description,
        event_date,
        time,
        location,
        organizer,
        max_attendees || null,
        category,
        image_url || null,
        req.params.id
    ], (err, result) => {
        if (err) {
            console.error('Error updating event:', err);
            return res.status(500).json({ error: 'Error updating event' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully' });
    });
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
    const sql = 'DELETE FROM events WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.status(500).json({ error: 'Error deleting event' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});