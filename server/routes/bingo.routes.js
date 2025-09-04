const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const winston = require('winston');
const authMiddleware = require('../middleware/authMiddleware');
const BingoCard = require('../models/bingo.model');
const Song = require('../models/song.model');

// Generates a new bingo card
router.get('/generate', [
    authMiddleware,
    check('size').optional().isInt({ min: 9, max: 25 }).toInt()
], async (req, res) => {
    try {
        // Validates a request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const size = req.query.size || 25;
        const userId = req.user.id;

        // Checks if enough songs exist
        const songCount = await Song.countDocuments();
        if (songCount < size) {
            winston.warn('Not enough songs for bingo card', {
                requested: size,
                available: songCount
            });
            return res.status(400).json({
                success: false,
                message: `Not enough songs (need ${size}, have ${songCount})`
            });
        }

        // Gets random songs
        const songs = await Song.aggregate([{ $sample: { size } }]);

        // Creates bingo card
        const bingoCard = new BingoCard({
            userId,
            size,
            squares: songs.map(song => ({
                songId: song._id,
                title: song.title,
                artist: song.artist,
                url: song.url,
                marked: false
            })),
            createdAt: new Date()
        });

        await bingoCard.save();

        winston.info(`Generated bingo card for user ${userId}`, {
            cardId: bingoCard._id,
            size
        });

        res.json({
            success: true,
            card: {
                id: bingoCard._id,
                size,
                squares: bingoCard.squares,
                createdAt: bingoCard.createdAt
            }
        });

    } catch (err) {
        winston.error('Bingo card generation failed', {
            error: err.message,
            stack: err.stack
        });
        res.status(500).json({
            success: false,
            message: 'Server error during card generation'
        });
    }
});

// Gets user's bingo cards
router.get('/cards', authMiddleware, async (req, res) => {
    try {
        const cards = await BingoCard.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(10)
            .select('_id size createdAt');

        res.json({
            success: true,
            cards
        });
    } catch (err) {
        winston.error('Failed to fetch bingo cards', {
            user: req.user.id,
            error: err.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cards'
        });
    }
});

// Marks a square on bingo card
router.patch('/:cardId/mark', [
    authMiddleware,
    check('squareIndex').isInt({ min: 0 }),
    check('marked').isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { cardId } = req.params;
        const { squareIndex, marked } = req.body;

        // Validate card ownership
        const card = await BingoCard.findOne({
            _id: cardId,
            userId: req.user.id
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'Card not found'
            });
        }

        // Validates square index
        if (squareIndex >= card.squares.length) {
            return res.status(400).json({
                success: false,
                message: 'Invalid square index'
            });
        }

        // Updates square
        card.squares[squareIndex].marked = marked;
        card.markModified('squares');
        await card.save();

        res.json({
            success: true,
            marked,
            squareIndex
        });

    } catch (err) {
        winston.error('Failed to mark square', {
            cardId: req.params.cardId,
            error: err.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to mark square'
        });
    }
});

// Checks for bingo
router.get('/:cardId/check-bingo', authMiddleware, async (req, res) => {
    try {
        const { cardId } = req.params;

        const card = await BingoCard.findOne({
            _id: cardId,
            userId: req.user.id
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'Card not found'
            });
        }

        const size = Math.sqrt(card.size);
        if (!Number.isInteger(size)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid card size for bingo check'
            });
        }

        const bingoResult = checkForBingo(card.squares, size);

        res.json({
            success: true,
            hasBingo: bingoResult.hasBingo,
            winningLines: bingoResult.winningLines
        });

    } catch (err) {
        winston.error('Bingo check failed', {
            cardId: req.params.cardId,
            error: err.message
        });
        res.status(500).json({
            success: false,
            message: 'Failed to check for bingo'
        });
    }
});

// Bingo checking logic
function checkForBingo(squares, size) {
    const marked = squares.map(sq => sq.marked);
    const winningLines = [];

    // Checks rows
    for (let row = 0; row < size; row++) {
        const start = row * size;
        if (marked.slice(start, start + size).every(Boolean)) {
            winningLines.push({ type: 'row', index: row });
        }
    }

    // Checks columns
    for (let col = 0; col < size; col++) {
        const column = [];
        for (let row = 0; row < size; row++) {
            column.push(marked[row * size + col]);
        }
        if (column.every(Boolean)) {
            winningLines.push({ type: 'column', index: col });
        }
    }

    // Checks diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
        diag1.push(marked[i * size + i]);
        diag2.push(marked[i * size + (size - 1 - i)]);
    }
    if (diag1.every(Boolean)) winningLines.push({ type: 'diagonal', index: 0 });
    if (diag2.every(Boolean)) winningLines.push({ type: 'diagonal', index: 1 });

    return {
        hasBingo: winningLines.length > 0,
        winningLines
    };
}

module.exports = router;