import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type MeResponse = { username: string };

function Profile() {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");


        if (!token) {
            navigate("/login", { replace: true });
            return;
        }


        const fetchMe = async () => {
            try {
                const res = await axios.get<MeResponse>("http://localhost:3000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsername(res.data.username);

                // cache in localStorage for quick future reads
                localStorage.setItem("user", JSON.stringify({ username: res.data.username }));
            } catch {
                // token invalid/expired → clear and redirect
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="bg-white p-8 rounded shadow-md text-center">
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <>
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">
                    {username ? `Welcome, ${username}!` : "Welcome!"}
                </h1>
                <p className="text-gray-600 mb-6">This is your profile page.</p>

                <button
                    onClick={handleLogout}
                    className="text-white px-6 py-2 rounded hover:brightness-90 transition"
                    style={{ backgroundColor: "#054A91" }}
                >
                    Logout
                </button>
            </div>
        </div>
            </>
    );
}

export default Profile;
