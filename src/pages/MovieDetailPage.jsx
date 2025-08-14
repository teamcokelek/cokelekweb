import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const MovieDetailPage = () => {
    const { id } = useParams();
    const { getMovieById, movies } = useContext(MovieContext);

    const movie = getMovieById(id);

    // Benzer filmler için öneriler
    const getSimilarMovies = () => {
        if (!movie) return [];

        return movies
            .filter(m =>
                m.id !== movie.id &&
                m.genres.some(g => movie.genres.includes(g))
            )
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
    };

    const similarMovies = getSimilarMovies();

    if (!movie) {
        return (
            <div className="not-found">
                <h1>404</h1>
                <h2>Film Bulunamadı</h2>
                <p>Aradığınız film mevcut değil.</p>
                <Link to="/" className="movie-details-btn">Ana Sayfaya Dön</Link>
            </div>
        );
    }

    return (
        <div className="movie-detail">
            <div className="detail-container">
                <div className="detail-poster">
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                </div>
                <div className="detail-info">
                    <h1 className="detail-title">{movie.title}</h1>

                    <div className="detail-meta">
                        <span>{movie.year}</span>
                        <span>|</span>
                        <span>{movie.runtime} dakika</span>
                        <span>|</span>
                        <span className="movie-rating">★ {movie.rating.toFixed(1)}</span>
                    </div>

                    <div className="detail-section">
                        <div className="movie-genres">
                            {movie.genres.map(genre => (
                                <span key={genre} className="genre-tag">{genre}</span>
                            ))}
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Özet</h3>
                        <p>{movie.plot}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Yönetmen</h3>
                        <p>{movie.director}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Oyuncular</h3>
                        <div className="detail-actors">
                            {movie.actors.map(actor => (
                                <span key={actor} className="actor-chip">{actor}</span>
                            ))}
                        </div>
                    </div>
                    <div className="detail-bottom-row">
                        <div className="detail-section">
                            <h3>Dil</h3>
                            <p>{movie.language}</p>
                        </div>

                        <a href={movie.imdbLink} target="_blank" rel="noopener noreferrer" className="detail-imdb-link">
                            IMDb'de Görüntüle
                        </a>
                    </div>
                </div>
            </div>

            {similarMovies.length > 0 && (
                <div className="similar-movies">
                    <h2>Benzer Filmler</h2>
                    <div className="movies-grid">
                        {similarMovies.map(movie => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                                <div className="movie-poster-container">
                                    <img
                                        src={movie.poster}
                                        alt={`${movie.title} poster`}
                                        className="movie-poster"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="movie-info">
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <div className="movie-year-rating">
                                        <span>{movie.year}</span>
                                        <div className="movie-rating">
                                            <span>★</span> {movie.rating.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetailPage;