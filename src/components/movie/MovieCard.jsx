import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const imageRef = useRef(null);

    // Resim yüklenme durumunu kontrol et
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    // Karta tıklama olayını yönet
    const handleCardClick = (e) => {
        e.preventDefault();

        // Eğer resim zaten yüklendiyse hemen yönlendir
        if (imageLoaded) {
            navigate(`/movie/${movie.id}`);
            return;
        }

        // Resim henüz yüklenmediyse, yükleme durumunu göster ve yüklendikten sonra yönlendir
        setIsLoading(true);

        // Resim zaten önbelleğe alındıysa ve yüklendiyse
        if (imageRef.current && imageRef.current.complete) {
            navigate(`/movie/${movie.id}`);
        }
        // Aksi takdirde resmin yüklenmesini bekle
        else {
            // Resim için bir yükleme olayı ekle
            const image = new Image();
            image.src = movie.poster;

            image.onload = () => {
                navigate(`/movie/${movie.id}`);
            };

            image.onerror = () => {
                // Resim yüklenemezse de yine de sayfaya git
                navigate(`/movie/${movie.id}`);
            };
        }
    };

    return (
        <div className={`movie-card ${isLoading ? 'is-loading' : ''}`} onClick={handleCardClick}>
            <div className="movie-poster-container">
                <img
                    ref={imageRef}
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    className="movie-poster"
                    onLoad={handleImageLoad}
                    loading="lazy"
                />
                {isLoading && (
                    <div className="image-loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                )}
            </div>
            <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <div className="movie-year-rating">
                    <span>{movie.year}</span>
                    <div className="movie-rating">
                        <span>★</span> {movie.rating.toFixed(1)}
                    </div>
                </div>
                <div className="movie-genres">
                    {movie.genres.map(genre => (
                        <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                </div>
                <button className="movie-details-btn">
                    Detayları Göster
                </button>
            </div>
        </div>
    );
};

export default MovieCard;