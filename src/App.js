import {React, useEffect, useState} from 'react';
import MovieCard from './MovieCard';
import DOMPurify from 'dompurify';
import './App.css';
import SearchIcon from './search.svg';


const API_KEY = '1c8bc09bba68241cd0bcbe7a142dda0f'
const API_URL = 'https://api.themoviedb.org/3';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genres, setGenres] = useState([]);

    const searchMovies = async (title) => {
        const cleanTitle = DOMPurify.sanitize(title);
        const response = await fetch(`${API_URL}/search/movie?query=${cleanTitle}&api_key=${API_KEY}`);
        const data = await response.json();

        setMovies(data.results);
    }

    const fetchGenres = async () => {
        const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();

        const genresMap = {};
        data.genres.forEach((genre) => {
            genresMap[genre.id] = genre.name;
        });

        setGenres(genresMap);
    }

    const fetchPopularMovies = async () => {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();

        setMovies(data.results);
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchGenres();
            await fetchPopularMovies();
        };
    
        fetchData();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchMovies(searchTerm);
        }
    }

    const handleTitleClick = () => {
        fetchPopularMovies();
    };

    return (
        <div className="app">
            <h1 style={{ cursor: 'pointer' }} onClick={handleTitleClick}>MovieDB</h1>

            <div className="search">
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                    {movies.map((movie) => (
                            <MovieCard
                            key={movie.id}
                            movie={movie}
                            genres={genres}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}

            
        </div>
    );
}

export default App;