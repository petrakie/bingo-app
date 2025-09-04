import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/auth/signup", {
                username: username.trim(),
                password: password.trim(),
            });
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <>
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full text-white px-6 py-2 rounded hover:brightness-90 transition"
                        style={{ backgroundColor: "#054A91" }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
            </>
    );
}

export default Register;
