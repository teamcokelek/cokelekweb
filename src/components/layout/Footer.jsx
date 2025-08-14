const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-links">
                    <a href="#">Hakkında</a>
                    <a href="#">Gizlilik Politikası</a>
                    <a href="#">İletişim</a>
                    <a href="#">SSS</a>
                </div>
                <div className="footer-copyright">
                    © {new Date().getFullYear()} Cokelek Film Platformu - Tüm hakları saklıdır
                </div>
            </div>
        </footer>
    );
};

export default Footer;