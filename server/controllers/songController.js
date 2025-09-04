const Song = require('../models/song.model');

exports.getAllSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};
