import { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating-desc');
    const [filterGenre, setFilterGenre] = useState('all');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data/movies.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch movie data');
                }
                const data = await response.json();
                setMovies(data);
                setFilteredMovies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        let result = [...movies];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply genre filter
        if (filterGenre !== 'all') {
            result = result.filter(movie =>
                movie.genres.includes(filterGenre)
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'title-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'year-asc':
                result.sort((a, b) => a.year - b.year);
                break;
            case 'year-desc':
                result.sort((a, b) => b.year - a.year);
                break;
            case 'rating-asc':
                result.sort((a, b) => a.rating - b.rating);
                break;
            case 'rating-desc':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setFilteredMovies(result);
    }, [movies, searchTerm, sortBy, filterGenre]);

    const getMovieById = (id) => {
        return movies.find(movie => movie.id === parseInt(id));
    };

    const getAllGenres = () => {
        const genres = new Set();
        movies.forEach(movie => {
            movie.genres.forEach(genre => genres.add(genre));
        });
        return Array.from(genres).sort();
    };

    return (
        <MovieContext.Provider value={{
            movies: filteredMovies,
            loading,
            error,
            searchTerm,
            setSearchTerm,
            sortBy,
            setSortBy,
            filterGenre,
            setFilterGenre,
            getMovieById,
            getAllGenres
        }}>
            {children}
        </MovieContext.Provider>
    );
};