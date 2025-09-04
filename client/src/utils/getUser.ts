
function getUser() {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        return null;
    }
}

export default getUser;

