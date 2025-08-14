import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import MovieFilters from '../components/movie/MovieFilters';
import MovieList from '../components/movie/MovieList';
import { MovieContext } from '../context/MovieContext';

const HomePage = () => {
    const { movies } = useContext(MovieContext);
    const [featuredMovie, setFeaturedMovie] = useState(null);

    useEffect(() => {
        if (movies && movies.length > 0) {
            // Rastgele bir film seç (top 10 içinden)
            const topMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
            const randomIndex = Math.floor(Math.random() * topMovies.length);
            setFeaturedMovie(topMovies[randomIndex]);
        }
    }, [movies]);

    if (!featuredMovie) return null;

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <img
                    src={featuredMovie.poster}
                    alt={featuredMovie.title}
                    className="hero-background"
                />
                <div className="hero-content">
                    <h1 className="hero-title">IMDB Top 250 Filmleri</h1>
                    <p className="hero-description">
                        Sinema dünyasının en iyi 250 filmini keşfedin.
                        {featuredMovie?.title} gibi ödüllü filmleri inceleyin.
                    </p>
                    <Link to={`/movie/${featuredMovie.id}`} className="hero-button">
                        Öne Çıkan Filmi İncele
                    </Link>
                </div>
            </section>

            <SearchBar />
            <MovieFilters />

            <h2>En İyi 250 Film</h2>
            <MovieList />
        </div>
    );
};

export default HomePage;