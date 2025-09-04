const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth.routes');
const songRoutes = require('./routes/songs.routes');
const bingoRoutes = require('./routes/bingo.routes');

r
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connection to MongoDB established');


        app.use('/api/auth', authRoutes);
        app.use('/api/songs', songRoutes);
        app.use('/api/bingo', bingoRoutes);
        app.get('/', (req, res) => {
            res.send('Server is running 🎶');
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB ❌', err);
    });
