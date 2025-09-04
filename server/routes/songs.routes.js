const express = require('express');
const router = express.Router();
const Song = require('../models/song.model'); // Make sure this path is correct

// GET all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs); // Send songs as JSON
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
