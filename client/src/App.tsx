import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bingo from "./pages/Bingo";
import Login from "./pages/Login";
import Profile from "./pages/Profile.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
    return (
        <>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bingo" element={<Bingo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
            </>
    );
}

export default App;
