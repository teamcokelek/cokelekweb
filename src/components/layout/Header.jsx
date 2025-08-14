import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    COKELEK<span>.</span>
                </Link>
                <nav className="nav-links">
                    <Link to="/">Ana Sayfa</Link>
                    <Link to="/">Top 250</Link>
                    <Link to="/">Kategoriler</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;