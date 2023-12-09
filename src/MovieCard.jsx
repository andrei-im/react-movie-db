import React from 'react'

const MovieCard = ({ movie, genres }) => {
    const getGenreNames = () => {
        if (!genres) {
            return '';
          }

        const genreNames = movie.genre_ids.map((genreId) => {
            const genreName = genres[genreId]
            return genreName || '';
        });

        return genreNames.join(', ');
    };

    return (
        <div className="movie">
            <div>
                <p>{movie.release_date}</p>
            </div>

            <div>
                <img src={movie.poster_path != 'N/A' ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : 'https://via.placeholder.com/400'} alt={movie.Title}></img>
            </div>

            <div>
                <span>{getGenreNames()}</span>
                <h3>{movie.original_title}</h3>
            </div>
        </div>
    );
}

export default MovieCard;