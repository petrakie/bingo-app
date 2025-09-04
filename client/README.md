# Music Bingo 🎵

A full-stack web application where players can enjoy a **music-based bingo game**.  
Users can register, log in, and play bingo by identifying randomly played songs.

---

## 🚀 Features
- **Authentication**
    - User registration and login with **JWT authentication**
    - Protected profile page showing logged-in user info
- **Music Bingo**
    - Loads a batch of 10 songs from the backend
    - Random song playback from YouTube links
    - Click to guess the correct song
    - Win condition: Correct guesses trigger messages and effects
- **Responsive Design**
    - Mobile-friendly with TailwindCSS
    - Clean and modern navigation bar with icons

---

## 🛠️ Tech Stack
### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Bcrypt for password hashing

---

## 📂 Project Structure
```bash
bingo-app/
│
├── client/                # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/    # Reusable UI components (Navbar, BingoBoard, etc.)
│   │   ├── pages/         # Pages (Home, Login, Register, Profile, Bingo, NotFound)
│   │   ├── utils/         # Helper functions
│   │   └── main.tsx
│   └── package.json
│
├── server/                # Backend (Node + Express + MongoDB)
│   ├── models/            # Database models (User, Song)
│   ├── routes/            # Express routes (auth, songs, bingo)
│   ├── middleware/        # Middleware (auth middleware)
│   ├── seed.js            # Script to seed the database with songs
│   ├── server.js          # Server entry point
│   └── package.json
│
└── README.md

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/bingo-app.git
cd bingo-app
