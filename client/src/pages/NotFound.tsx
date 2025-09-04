import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <>
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
                Return Home
            </Link>
        </div>
        </>
    );
}

export default NotFound;