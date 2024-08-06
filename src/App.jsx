import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MovieCard from "./components/movieCard";
import "@fortawesome/fontawesome-free/css/all.min.css";

const API_URL = "http://www.omdbapi.com?apikey=4a8126cf";
const movie1 = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
};

function App() {
  let uk = 1;
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm); // Trigger the search when Enter key is pressed
    }
  };

  useEffect(() => {
    searchMovies("shutter island");
  }, []);
  return (
    <div className="app">
      <h1>Movie</h1>
      <div className="search">
        <input
          value={searchTerm}
          placeholder="search for movies"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <i
          className="fas fa-search"
          onClick={() => searchMovies(searchTerm)}
          alt="search"
        ></i>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={uk++} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>NO MOVIES FOUND</h2>
        </div>
      )}
    </div>
  );
}

export default App;
