const Song = require('../models/song.model');

exports.getRandomBingoCard = async (req, res) => {
  const songs = await Song.aggregate([{ $sample: { size: 25 } }]);
  res.json(songs);
};
