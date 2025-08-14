import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="movie-details-btn">Back to Home</Link>
        </div>
    );
};

export default NotFoundPage;