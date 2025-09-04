const mongoose = require('mongoose');

const bingoCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: 9,
    max: 25
  },
  squares: [{
    songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    url: { type: String },
    marked: { type: Boolean, default: false }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});


bingoCardSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('BingoCard', bingoCardSchema);