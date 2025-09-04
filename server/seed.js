const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('./models/song.model'); 

dotenv.config();

const songs = [
  { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=QkF3oxziUI4" },
  { title: "Hotel California", artist: "Eagles", url: "https://www.youtube.com/watch?v=EqPtz5qN7HM" },
  { title: "Sweet Child O' Mine", artist: "Guns N' Roses", url: "https://www.youtube.com/watch?v=1w7OgIMMRc4" },
  { title: "Smells Like Teen Spirit", artist: "Nirvana", url: "https://www.youtube.com/watch?v=hTWKbfoikeg" },
  { title: "Back in Black", artist: "AC/DC", url: "https://www.youtube.com/watch?v=pAgnJDJN4VA" },
  { title: "Another Brick in the Wall", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=HrxX9TBj2zY" },
  { title: "Livin' on a Prayer", artist: "Bon Jovi", url: "https://www.youtube.com/watch?v=lDK9QqIzhwk" },
  { title: "Highway to Hell", artist: "AC/DC", url: "https://www.youtube.com/watch?v=l482T0yNkeo" },
  { title: "Dream On", artist: "Aerosmith", url: "https://www.youtube.com/watch?v=sZfZ8uWaOFI" },
  { title: "November Rain", artist: "Guns N' Roses", url: "https://www.youtube.com/watch?v=8SbUC-UaAxE" },
  { title: "Paradise City", artist: "Guns N' Roses", url: "https://www.youtube.com/watch?v=Rbm6GXllBiw" },
  { title: "Kashmir", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=sfR_HWMzgyc" },
  { title: "Comfortably Numb", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=_FrOQC-zEog" },
  { title: "Whole Lotta Love", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=HQmmM_qwG4k" },
  { title: "Enter Sandman", artist: "Metallica", url: "https://www.youtube.com/watch?v=CD-E-LDc384" },
  { title: "One", artist: "Metallica", url: "https://www.youtube.com/watch?v=WM8bTdBs-cw" },
  { title: "Free Bird", artist: "Lynyrd Skynyrd", url: "https://www.youtube.com/watch?v=QxIWDmmqZzY" },
  { title: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", url: "https://www.youtube.com/watch?v=ye5BuYf8q4o" },
  { title: "You Shook Me All Night Long", artist: "AC/DC", url: "https://www.youtube.com/watch?v=Lo2qQmj0_h4" },
  { title: "Paint It Black", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=O4irXQhgMqg" },
  { title: "Gimme Shelter", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=R3rnxQBizoU" },
  { title: "Born to Run", artist: "Bruce Springsteen", url: "https://www.youtube.com/watch?v=IxuThNgl3YA" },
  { title: "Thunderstruck", artist: "AC/DC", url: "https://www.youtube.com/watch?v=v2AC41dglnM" },
  { title: "Wish You Were Here", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=IXdNnw99-Ic" },
  { title: "Time", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=JwYX52BP2Sk" },
  { title: "Layla", artist: "Eric Clapton", url: "https://www.youtube.com/watch?v=fX5USg8_1gA" },
  { title: "Don't Stop Believin'", artist: "Journey", url: "https://www.youtube.com/watch?v=1k8craCGpgs" },
  { title: "Black Dog", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=6tlSx0jkuLM" },
  { title: "Hells Bells", artist: "AC/DC", url: "https://www.youtube.com/watch?v=etAIpkdhU9Q" }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Song.deleteMany();
    await Song.insertMany(songs);

    console.log('30 rock songs with YouTube links added successfully!');
  } catch (err) {
    console.error('Database error:', err);
  } finally {
    await mongoose.disconnect();
  }
})();
