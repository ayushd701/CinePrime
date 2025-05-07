# CinePrime 🎬

CinePrime is a responsive and interactive movie & TV show web app that allows users to explore trending, popular, and detailed content about movies, TV shows, and actors. Built using modern web technologies for a smooth and engaging user experience.

## 🚀 Features

- 🌐 Browse Trending & Popular Movies/TV Shows
- 🎥 View detailed pages with trailers
- 👨‍🎤 Explore actor profiles and filmography
- 🔍 Search functionality 
- ⚡ Smooth routing using React Router
- 💅 Clean and responsive UI with Tailwind CSS

## 🛠️ Tech Stack

- **React.js** – Frontend library
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first CSS framework
- **TMDB API** – For fetching movie and TV show data 

## 🧭 Project Structure

```
CinePrime/
├── public/
├── src/
│   ├── components/
│   ├── utils/
│   ├── store/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ayushd701/cineprime.git
cd cineprime
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## 🌐 Routes

- `/` – Home
- `/trending` – Trending Movies/Shows
- `/popular` – Popular Content
- `/movie` – All Movies
- `/movie/details/:id` – Movie Details
  - `/movie/details/:id/trailer` – Movie Trailer
- `/tv` – All TV Shows
- `/tv/details/:id` – TV Show Details
  - `/tv/details/:id/trailer` – TV Trailer
- `/person` – All People
- `/person/details/:id` – Actor Details
- `/about` – About Page
- `/contact` – Contact Page
- `*` – 404 Not Found


---
<br>

> Feel free to fork and contribute to this project!


