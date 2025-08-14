import { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/MovieContext';

const MovieFilters = () => {
    const { sortBy, setSortBy, filterGenre, setFilterGenre, getAllGenres } = useContext(MovieContext);

    const genres = getAllGenres();

    // Filtre değişikliklerinde sayfayı hızlıca yukarı kaydır
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [sortBy, filterGenre]);

    return (
        <div className="filters">
            <h3 className="filters-title">Filtre ve Sıralama</h3>
            <div className="filters-container">
                <div className="filter-group">
                    <label htmlFor="sort-by">Sıralama</label>
                    <select
                        id="sort-by"
                        className="filter-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="rating-desc">Puan (Yüksekten Düşüğe)</option>
                        <option value="rating-asc">Puan (Düşükten Yükseğe)</option>
                        <option value="year-desc">Yıl (Yeniden Eskiye)</option>
                        <option value="year-asc">Yıl (Eskiden Yeniye)</option>
                        <option value="title-asc">İsim (A-Z)</option>
                        <option value="title-desc">İsim (Z-A)</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="filter-genre">Tür Filtresi</label>
                    <select
                        id="filter-genre"
                        className="filter-select"
                        value={filterGenre}
                        onChange={(e) => setFilterGenre(e.target.value)}
                    >
                        <option value="all">Tüm Türler</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default MovieFilters;