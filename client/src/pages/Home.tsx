import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center relative">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p className="text-lg mb-8">
                Get ready to play and enjoy your favorite rock classics.
            </p>

            <button
                onClick={() => navigate("/bingo")}
                className="text-white px-8 py-3 rounded-lg hover:brightness-90 transition shadow-md"
                style={{ backgroundColor: "#054A91" }}
            >
                Start Playing !
            </button>

            <p className="text-gray-600 mt-6 max-w-md">
                Click <span className="font-semibold">Start Playing</span> to load
                10 random songs. One will play — your goal is to guess which song
                it is to score bingo!
            </p>
        </div>
            </>
    );
}

export default Home;
