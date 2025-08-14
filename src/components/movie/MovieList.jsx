import { useContext } from 'react';
import { MovieContext } from '../../context/MovieContext';
import MovieCard from './MovieCard';

const MovieList = () => {
    const { movies, loading, error } = useContext(MovieContext);

    if (loading) {
        return <div className="loading">Filmler yükleniyor...</div>;
    }

    if (error) {
        return <div className="error">Hata: {error}</div>;
    }

    if (movies.length === 0) {
        return <div className="no-results">Kriterlerinize uygun film bulunamadı.</div>;
    }

    return (
        <div className="movies-grid">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;