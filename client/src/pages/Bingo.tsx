import { useState } from "react";
import axios from "axios";

type Song = {
    title: string;
    artist: string;
    url: string;
};

function Bingo() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const fetchSongs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/api/songs");
            setSongs(res.data.slice(0, 10));
        } catch (err) {
            console.error("Failed to load songs:", err);
        } finally {
            setLoading(false);
        }
    };


    const getYouTubeId = (url: string) => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        return match ? match[1] : null;
    };


    const startBingo = () => {
        if (songs.length === 0) return;

        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        setCurrentSong(randomSong);
        setMessage("🎶 Guess which song is playing!");
    };


    const handleGuess = (song: Song) => {
        if (!currentSong) return;

        if (song.title === currentSong.title) {
            setMessage(`✅ Correct! It was "${song.title}"`);
            setCurrentSong(null);
        } else {
            setMessage("❌ Wrong guess, try again!");
        }
    };

    return (
        <>
        <div className="max-w-4xl mx-auto mt-20 px-4">
            <h1 className="text-4xl font-bold text-center mb-6">🎵 Bingo Music Game</h1>
            <p className="text-center text-gray-600 mb-10">
                Listen to the song and click the right title to win!
            </p>

            <div className="text-center mb-6">
                <button
                    onClick={fetchSongs}
                    className="text-white px-6 py-2 rounded hover:brightness-90 transition mr-4"
                    style={{ backgroundColor: "#054A91" }}
                >
                    Load Songs
                </button>
                <button
                    onClick={startBingo}
                    disabled={songs.length === 0}
                    className="text-white px-6 py-2 rounded hover:brightness-90 transition"
                    style={{ backgroundColor: "#054A91" }}
                >
                    Start Bingo
                </button>
            </div>

            {loading ? (
                <p className="text-center">Loading songs...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {songs.map((song, index) => (
                        <div
                            key={index}
                            onClick={() => handleGuess(song)}
                            className="p-4 border rounded shadow cursor-pointer transition"
                            style={{
                                backgroundColor: "white",
                                transition: "0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#054A91";
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.color = "black";
                            }}
                        >
                            <p className="font-semibold">{song.title}</p>
                            <p className="text-sm">{song.artist}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Show YouTube player if a song is active */}
            {currentSong && (
                <div className="mt-6 flex justify-center">
                    <iframe
                        width="0"
                        height="0"
                        src={`https://www.youtube.com/embed/${getYouTubeId(
                            currentSong.url
                        )}?autoplay=1`}
                        title="YouTube player"
                        allow="autoplay"
                    ></iframe>
                </div>
            )}

            {message && (
                <p className="text-center mt-6 text-lg font-semibold">{message}</p>
            )}
        </div>
        </>
    );
}

export default Bingo;
