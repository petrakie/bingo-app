import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const BACKEND_URL = "http://localhost:3000"; // change if your server runs elsewhere

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("[Login] sending request…", { username });
            const res = await axios.post(
                `${BACKEND_URL}/api/auth/login`,
                {
                    username: username.trim(),
                    password: password.trim(),
                },
                { timeout: 8000 }
            );

            console.log("[Login] response:", res.status, res.data);

            if (!res.data?.token || !res.data?.user) {
                throw new Error("Unexpected response from server.");
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/profile", { replace: true });
        } catch (err) {
            let msg = "Login failed.";
            if (axios.isAxiosError(err)) {
                const ax = err as AxiosError<{ msg?: string; error?: string }>;
                console.error("[Login] axios error:", {
                    status: ax.response?.status,
                    data: ax.response?.data,
                    message: ax.message,
                });
                msg = ax.response?.data?.msg || ax.response?.data?.error || ax.message || msg;
            } else if (err instanceof Error) {
                console.error("[Login] error:", err);
                msg = err.message || msg;
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white px-6 py-2 rounded hover:brightness-90 transition disabled:opacity-60"
                        style={{ backgroundColor: "#054A91" }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link className="text-blue-700 underline hover:text-red-950 transition" to="/register">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
            </>
    );
}

export default Login;
