import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Music, LogIn, Menu, User } from "lucide-react";

function Navbar() {
    const location = useLocation();
    const current = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const linkClass = (path: string) =>
        `flex flex-col items-center text-sm ${
            current === path ? "text-[#ff7875]" : "text-gray-600"
        }`;

    return (
        <>
        <nav
            style={{ backgroundColor: "#DBE4EE", fontFamily: "'Poppins', sans-serif" }}
            className="p-4 shadow-lg flex justify-between items-center px-6 relative fixed top-0 left-0 w-full z-50"
        >
            {/* Logo */}
            <Link to="/" className="font-semibold text-2xl text-black select-none">
                Music Bingo
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <Menu
                    className="w-6 h-6 text-gray-700 cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>

            {/* Menu Items */}
            <div
                className={`absolute right-6 top-16 flex flex-col bg-[#DBE4EE] space-y-4 p-4 rounded-lg shadow-md md:shadow-none md:static md:flex md:flex-row md:items-center md:space-x-8 md:space-y-0 md:p-0 transition-all duration-300 ${
                    menuOpen ? "block" : "hidden"
                } md:block`}
            >
                <Link to="/" onClick={() => setMenuOpen(false)} className={linkClass("/")}>
                    <Home className="w-6 h-6 mb-1" />
                    <span>Home</span>
                </Link>
                <Link to="/bingo" onClick={() => setMenuOpen(false)} className={linkClass("/bingo")}>
                    <Music className="w-6 h-6 mb-1" />
                    <span>Bingo</span>
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className={linkClass("/login")}>
                    <LogIn className="w-6 h-6 mb-1" />
                    <span>Login</span>
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className={linkClass("/profile")}>
                    <User className="w-6 h-6 mb-1" />
                    <span>Profile</span>
                </Link>
            </div>
        </nav>
        </>
    );
}

export default Navbar;
